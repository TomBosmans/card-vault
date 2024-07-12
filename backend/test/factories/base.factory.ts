export default abstract class BaseFactory<BuildAttributes, CreateAttributes> {
  protected abstract save(object: BuildAttributes): Promise<CreateAttributes>
  protected abstract generate(): BuildAttributes

  public build(params: Partial<BuildAttributes> = {}): BuildAttributes {
    return { ...this.generate(), ...params }
  }

  public buildMany(times: number, params?: Partial<BuildAttributes>): BuildAttributes[] {
    return [...(Array(times) as undefined[])].map(() => this.build(params))
  }

  public async create(params?: Partial<BuildAttributes>): Promise<CreateAttributes> {
    return await this.save(this.build(params))
  }

  public async createMany(
    times: number,
    params?: Partial<BuildAttributes>,
  ): Promise<CreateAttributes[]> {
    const objects: BuildAttributes[] = this.buildMany(times, params)

    const result = []
    for (const object of objects) {
      result.push(await this.save(object))
    }

    return result
  }
}
