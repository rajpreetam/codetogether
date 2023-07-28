import { VariantProps, cva } from 'class-variance-authority';
import React, { ComponentProps } from 'react';

const avatarStyles = cva(
    'fr-ic-jc rounded-full border cursor-pointer',
    {
        variants: {
            size: {
                sm: 'h-6 w-6',
                md: 'h-8 w-8',
                lg: 'h-10 w-10'
            }
        },
        defaultVariants: {
            size: 'md'
        }
    }
)

export interface AvatarProps extends ComponentProps<'div'>, VariantProps<typeof avatarStyles> {
    text?: string;
    image?: string;
}

export const Avatar = ({
    text = '',
    image = '',
    size,
    ...props
}: AvatarProps) => {
    return (
        <div {...props} className={avatarStyles({size})}>
            {text !== '' ? (
                <p>{text}</p>
            ) : (
                <img src={image} alt="avatar" className='rounded-full' />
            )}
        </div>
    );
}