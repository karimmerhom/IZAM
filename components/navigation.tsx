"use client";

import type React from "react";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditIcon from "@mui/icons-material/Edit";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import type { NavItem } from "@/lib/types";
import { trackNavItemMove } from "@/lib/api";

interface NavigationProps {
  items: NavItem[];
  setItems: React.Dispatch<React.SetStateAction<NavItem[]>>;
  isEditMode: boolean;
  currentPath: string;
}

export default function Navigation({
  items,
  setItems,
  isEditMode,
  currentPath,
}: NavigationProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const activeItem = findItemById(items, active.id);
      const overItem = findItemById(items, over.id);

      if (activeItem && overItem) {
        // Only allow reordering within the same level
        const activeParentId = findParentId(items, active.id);
        const overParentId = findParentId(items, over.id);

        if (activeParentId === overParentId) {
          const newItems = [...items];

          if (activeParentId === null) {
            // Top-level items
            const oldIndex = newItems.findIndex(
              (item) => item.id === active.id
            );
            const newIndex = newItems.findIndex((item) => item.id === over.id);

            const [movedItem] = newItems.splice(oldIndex, 1);
            newItems.splice(newIndex, 0, movedItem);

            setItems(newItems);
            trackNavItemMove(active.id, oldIndex, newIndex);
          } else {
            // Child items
            const parentItem = findItemById(newItems, activeParentId);
            if (parentItem && parentItem.children) {
              const oldIndex = parentItem.children.findIndex(
                (item) => item.id === active.id
              );
              const newIndex = parentItem.children.findIndex(
                (item) => item.id === over.id
              );

              const [movedItem] = parentItem.children.splice(oldIndex, 1);
              parentItem.children.splice(newIndex, 0, movedItem);

              setItems(newItems);
              trackNavItemMove(active.id, oldIndex, newIndex);
            }
          }
        }
      }
    }
  };

  const findItemById = (items: NavItem[], id: number): NavItem | null => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findItemById(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const findParentId = (
    items: NavItem[],
    id: number,
    parentId: number | null = null
  ): number | null => {
    for (const item of items) {
      if (item.id === id) return parentId;
      if (item.children) {
        const found = findParentId(item.children, id, item.id);
        if (found !== null) return found;
      }
    }
    return null;
  };

  const toggleVisibility = (id: number) => {
    const updateVisibility = (items: NavItem[]): NavItem[] => {
      return items.map((item) => {
        if (item.id === id) {
          return { ...item, visible: item.visible === false ? true : false };
        }
        if (item.children) {
          return { ...item, children: updateVisibility(item.children) };
        }
        return item;
      });
    };

    setItems(updateVisibility(items));
  };

  const updateTitle = (id: number, title: string) => {
    const updateItemTitle = (items: NavItem[]): NavItem[] => {
      return items.map((item) => {
        if (item.id === id) {
          return { ...item, title };
        }
        if (item.children) {
          return { ...item, children: updateItemTitle(item.children) };
        }
        return item;
      });
    };

    setItems(updateItemTitle(items));
  };

  const renderItems = (items: NavItem[], level = 0) => {
    const itemIds = items.map((item) => item.id);

    return (
      <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
        <Box sx={{ ml: level > 0 ? 2 : 0, mt: level > 0 ? 0.5 : 0 }}>
          {items.map((item) => {
            // Skip items that are not visible in view mode
            if (!isEditMode && item.visible === false) return null;

            return (
              <SortableNavItem
                key={item.id}
                item={item}
                isEditMode={isEditMode}
                isActive={item.target === currentPath}
                toggleVisibility={toggleVisibility}
                updateTitle={updateTitle}
                level={level}
              >
                {item.children &&
                  item.children.length > 0 &&
                  renderItems(item.children, level + 1)}
              </SortableNavItem>
            );
          })}
        </Box>
      </SortableContext>
    );
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
    >
      <Box sx={{ py: 1, flexGrow: 1, overflow: "auto" }}>
        {renderItems(items)}
      </Box>
    </DndContext>
  );
}

interface SortableNavItemProps {
  item: NavItem;
  isEditMode: boolean;
  isActive: boolean;
  toggleVisibility: (id: number) => void;
  updateTitle: (id: number, title: string) => void;
  children?: React.ReactNode;
  level: number;
}

function SortableNavItem({
  item,
  isEditMode,
  isActive,
  toggleVisibility,
  updateTitle,
  children,
  level,
}: SortableNavItemProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(item.title);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    disabled: !isEditMode,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    updateTitle(item.id, title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateTitle(item.id, title);
      setIsEditing(false);
    }
  };

  const handleVisibilityToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleVisibility(item.id);
  };

  return (
    <Box ref={setNodeRef} style={style} sx={{ userSelect: "none" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          px: 2,
          py: 1,
          borderRadius: 1,
          bgcolor: isActive ? "grey.600" : "transparent",
          color: isActive ? "primary.main" : "text.primary",
          "&:hover": {
            bgcolor: isActive ? "grey.600" : "grey.400",
          },
          cursor: isEditMode ? "move" : "pointer",
        }}
        {...attributes}
        {...listeners}
      >
        {isEditMode && <DragIndicatorIcon fontSize="small" />}
        {item.children && item.children.length > 0 && (
          <IconButton
            onClick={toggleExpand}
            size="small"
            sx={{ mr: 0.5, color: "grey.300", p: 0.25 }}
          >
            {isExpanded ? (
              <ExpandMoreIcon fontSize="small" />
            ) : (
              <ChevronRightIcon fontSize="small" />
            )}
          </IconButton>
        )}

        {isEditMode && isEditing ? (
          <TextField
            value={title}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onKeyDown={handleKeyDown}
            size="small"
            variant="outlined"
            autoFocus
            onClick={(e) => e.stopPropagation()}
            sx={{
              flex: 1,
              "& .MuiOutlinedInput-root": {
                height: 32,
                fontSize: "0.875rem",
              },
            }}
          />
        ) : (
          <>
            {item.target ? (
              <Box
                style={{
                  flex: 1,
                  textDecoration: "none",
                  color: "inherit",
                  pointerEvents: isEditMode ? "none" : "auto",
                }}
              >
                <Typography variant="body2">{item.title}</Typography>
              </Box>
            ) : (
              <Typography variant="body2" sx={{ flex: 1 }}>
                {item.title}
              </Typography>
            )}
          </>
        )}

        {isEditMode && (
          <Box sx={{ display: "flex", ml: "auto" }}>
            <IconButton
              size="small"
              onClick={handleEditClick}
              sx={{ color: "grey.300", p: 0.5 }}
            >
              <EditIcon sx={{ fontSize: 16 }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={handleVisibilityToggle}
              sx={{ color: "grey.300", p: 0.5 }}
            >
              {item.visible === false ? (
                <VisibilityOffIcon sx={{ fontSize: 16 }} />
              ) : (
                <VisibilityIcon sx={{ fontSize: 16 }} />
              )}
            </IconButton>
          </Box>
        )}
      </Box>

      {isExpanded && children}
    </Box>
  );
}
