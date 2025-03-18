import type { NavItem } from "./types"
//deployed link
const API_URL = "https://production-api.inplace-eg.com"

// const API_URL = "http://localhost:8081"

export async function fetchNavigation(): Promise<NavItem[]> {
  try {
    const response = await fetch(`${API_URL}/nav`)
    if (!response.ok) {
      throw new Error(`Failed to fetch navigation: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching navigation:", error)
    throw error
  }
}

export async function saveNavigation(navItems: NavItem[]): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/nav`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(navItems),
    })

    if (!response.ok) {
      throw new Error(`Failed to save navigation: ${response.status}`)
    }
  } catch (error) {
    console.error("Error saving navigation:", error)
    throw error
  }
}

export async function trackNavItemMove(id: number, from: number, to: number): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, from, to }),
    })

    if (!response.ok) {
      throw new Error(`Failed to track navigation change: ${response.status}`)
    }
  } catch (error) {
    console.error("Error tracking navigation change:", error)
  }
}

