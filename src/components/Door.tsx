import * as React from 'react'
export interface DoorProps { compiler: string; framework: string; }

export const Door = (props: DoorProps) => <h1>Door with {props.compiler} and {props.framework}!</h1>;

