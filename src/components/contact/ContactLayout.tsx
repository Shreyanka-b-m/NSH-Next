// Forms docs: docs/forms/README.md — record changes in docs/forms/CHANGELOG.md.
import Image from 'next/image'
import type { ReactNode } from 'react'
import FormRenderer from '@/components/forms/FormRenderer'
import type { PublicForm } from '@/lib/forms'

type ContactLayoutProps = {
  form: PublicForm
  subtitle: string
  image: { src: string; alt: string }
  children: ReactNode
}

// Image left / content right on desktop; image stacked on top for tablet and mobile.
export default function ContactLayout({ form, subtitle, image, children }: ContactLayoutProps) {
  return (
    <section className="grid min-[977px]:min-h-[50vh] min-[977px]:grid-cols-2">
      <div className="relative h-[450px] max-[768px]:h-[280px] min-[977px]:h-auto">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="(min-width: 977px) 50vw, 100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="max-w-[700px] px-[30px] py-[100px] max-[976px]:px-[60px] max-[976px]:py-[60px] max-[768px]:px-5 max-[768px]:py-[50px]">
        <h1 className="section-heading">Contact Us</h1>
        <h2 className="mt-8 mb-4 font-(family-name:--font-body)! text-[22px]! leading-tight! font-medium text-(--color-brown)">
          {subtitle}
        </h2>
        {children}
        <FormRenderer form={form} />
      </div>
    </section>
  )
}
