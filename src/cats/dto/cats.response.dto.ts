import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cat.schema';

export class CatResponseDto extends PickType(Cat, ['email', 'name']) {
  @ApiProperty({
    example: '23ldjfwefljl@lajfd',
    description: 'id',
  })
  id: string;
}
