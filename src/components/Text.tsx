import { tv, type VariantProps } from 'tailwind-variants'

const textVariants = tv({
  base: 'font-sans',
  variants: {
    size: {
      'heading-xl': 'text-2xl leading-6 font-bold',
      'heading-lg': 'text-xl leading-6 font-bold',
      'body-md': 'text-sm leading-4.5 font-normal',
      'body-sm': 'text-[10px] leading-3.5 font-normal',
    },
    color: {
      primary: 'text-gray-100',
      secondary: 'text-gray-200',
      white: 'text-white',
      success: 'text-green-100',
    },
  },
  defaultVariants: {
    size: 'body-md',
    color: 'secondary',
  },
})

type As = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'label'

interface TextProps
  extends Omit<React.ComponentPropsWithoutRef<"span">, "color">,
    VariantProps<typeof textVariants> {
  as?: As
}

export function Text({ as: Tag = 'span', size, color, className, children, ...props }: TextProps) {
  return (
    <Tag className={textVariants({ size, color, className })} {...props}>
      {children}
    </Tag>
  )
}
