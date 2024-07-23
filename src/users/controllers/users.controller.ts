import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  
  constructor(private usersService: UsersService) {}
  
  @Get()
  get() {
    return this.usersService.get();
  }

  @Public()
  @Post()
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() changes: UpdateUserDto) {
    return this.usersService.update(id, changes);
  }

  @Delete()
  delete(@Request() req) {
    return this.usersService.delete(req.user.sub)
  }
}
