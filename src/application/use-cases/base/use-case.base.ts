export interface UseCaseBase<Request, Response> {
  execute(request: Request): Promise<Response>;
}
