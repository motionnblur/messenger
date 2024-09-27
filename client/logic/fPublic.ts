export function arraysEqual<T>(arr1: T[], arr2: T[]): boolean {
  // Check if lengths are different
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Check each element
  for (let i = 0; i < arr1.length; i++) {
    // Use JSON.stringify for deep comparison of objects
    if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) {
      return false;
    }
  }

  return true;
}
