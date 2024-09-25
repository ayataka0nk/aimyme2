export class SafeFormData {
  public formData: FormData
  public constructor(formData: FormData) {
    this.formData = formData
  }
  public getString(name: string): string | undefined {
    const value = this.formData.get(name)
    if (value === null || value === '') {
      return undefined
    }
    if (typeof value !== 'string') {
      throw new Error('Invalid form data')
    }
    return value
  }
}
