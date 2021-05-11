import { UserDto } from "src/app/user/dtos/user.dto";

export class AuthResponseDto {
  token: string;
  user: UserDto;
}
