export abstract class TokenService {
  abstract generate(payload: { userId: string }): Promise<string>;
  abstract verify(token: string): Promise<{ userId: string } | null>;
}
