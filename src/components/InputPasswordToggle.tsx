import React, { Fragment, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Input from './Input';

interface InputPasswordToggleProps {
    control: any;
    id: string;
    name: string;
    placeholder: string;
    defaultValue?: any;
    // readonly?: boolean;
}

const InputPasswordToggle: React.FC<InputPasswordToggleProps> = (
    props: InputPasswordToggleProps,
) => {
    const { control, id, name, placeholder} = props;

    const [togglePassword, setTogglePassword] = useState(false);

    if (!control) return null;

    return (
        <Fragment>
            <Input
                type={togglePassword ? 'text' : 'password'}
                id={id}
                name={name}
                placeholder={placeholder}
                control={control}
                // readonly={readonly}
                hasIcon={true}
            >
                {!togglePassword ? (
                    <FiEye onClick={() => setTogglePassword(true)} />
                ) : (
                    <FiEyeOff onClick={() => setTogglePassword(false)} />
                )}
            </Input>
        </Fragment>
    );
};

export default InputPasswordToggle;
