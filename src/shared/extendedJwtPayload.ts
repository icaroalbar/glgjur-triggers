import { UUID } from "crypto";
import { JwtPayload } from "jwt-decode";

export interface ExtendedJwtPayload extends JwtPayload {
  zoneinfo?: string;
}

export interface BaseDatabaseQuery {
  schema: string;
  sub: UUID;
}
