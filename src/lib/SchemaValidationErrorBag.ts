import { z } from 'zod'

export class SchemaValidationErrorBag {
  public error: z.ZodError
  public constructor(error: z.ZodError) {
    this.error = error
  }
  public getFirstError(name: string): string | undefined {
    return this.error.errors.find((e) => e.path[0] === name)?.message
  }
}
