import React from 'react'
import Input from '../Input/index'

import {Controller, useForm} from 'react-hook-form'

export default function ControlledInput({control, name, ...rest}){

   return(
      <Controller
         name={name}
         control={control}
         render={({field:{onChange, value}})=>(
            <Input
               onChangeText={onChange}
               value={value}
               {...rest}
               
            />
         )}
      />
   )
}