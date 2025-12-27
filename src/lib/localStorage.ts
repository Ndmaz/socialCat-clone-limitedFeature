

export function GETlocalStorage(key: string): string | null {
    try {
      return localStorage.getItem(key)  
    } catch (error) {
        return null
    }
    
}
export function SETlocalStorage(key: string, value: string): void {
    try {
      localStorage.setItem(key, value)  
      return  
    } catch (error) {
        return
    }
}