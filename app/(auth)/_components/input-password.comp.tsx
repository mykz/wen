'use client'

import { ComponentProps, useState } from 'react'

import { IconEye, IconEyeOff } from '@tabler/icons-react'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'

export type InputPasswordCompProps = ComponentProps<'input'>

export function InputPassword(props: InputPasswordCompProps) {
  const [showPassword, setShowPassword] = useState(false)

  const Icon = showPassword ? IconEye : IconEyeOff

  return (
    <InputGroup>
      <InputGroupInput {...props} type={showPassword ? 'text' : 'password'} />
      <InputGroupAddon align="inline-end">
        <InputGroupButton onClick={() => setShowPassword(!showPassword)}>
          <Icon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
