import { Exclude } from "class-transformer";

export class UserDTO {

  private id!: string;

  private avatar?: string;

  private first_name!: string;

  private last_name?: string;

  private username!: string;

  private email?: string;

  private phone_number?: string;

  private email_verified!: boolean;

  private phone_verified!: boolean;

  private streak!: number;

  private created_at!: Date;

  private updated_at!: Date;

  @Exclude()
  private refresh_token!: string;

  @Exclude()
  private password!: string;

  @Exclude()
  private deleted!: Date;
}
