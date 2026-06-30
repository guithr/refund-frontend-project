import MagnifyingGlass from '../assets/icons/magnifying-glass.svg?react'
import { Text } from '../components/Text'
import { Button } from '../components/Button'
import { IconButton } from '../components/IconButton'
import { Icon } from '../components/Icon'
import { NavLink } from '../components/NavLink'
import { Input } from '../components/Input'
import { SelectField } from '../components/SelectField'

export function ComponentPlayground() {
  return (
    <div className="flex min-h-screen flex-col gap-8 bg-gray-500 p-8">
      <Text size="heading-lg" color="primary">Text Component</Text>

      <section className="space-y-2">
        <Text size="heading-lg" color="primary">heading-lg</Text>
        <Text size="heading-lg" color="secondary">heading-lg secondary</Text>
        <Text size="heading-lg" color="success">heading-lg success</Text>
        <Text size="heading-lg" color="white" as="h1" className="bg-gray-100 p-2">
          heading-lg white on dark
        </Text>
      </section>

      <section className="space-y-2">
        <Text size="heading-xl" color="success">heading-xl</Text>
        <Text size="heading-xl" color="primary">Solicitação enviada!</Text>
      </section>

      <section className="space-y-2">
        <Text size="body-md" color="primary">body-md primary</Text>
        <Text size="body-md" color="secondary">body-md secondary — Dados da despesa para solicitar reembolso.</Text>
        <Text size="body-md" color="success">body-md success</Text>
        <Text as="p" size="body-md" color="secondary">
          body-md como parágrafo. Agora é apenas aguardar! Sua solicitação será analisada
          e, em breve, o setor financeiro irá entrar em contato com você.
        </Text>
      </section>

      <section className="space-y-2">
        <Text size="body-sm" color="secondary">body-sm secondary (label)</Text>
        <Text size="body-sm" color="success">body-sm success (label ativo)</Text>
      </section>

      <section className="space-y-4">
        <Text size="heading-lg" color="primary">Button</Text>
        <div className="flex items-center gap-4">
          <Button>Default</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      <section className="space-y-4">
        <Text size="heading-lg" color="primary">Icon Button</Text>
        <div className="flex items-center gap-4">
          <IconButton>
            <Icon svg={MagnifyingGlass} className="size-6" />
          </IconButton>
          <IconButton disabled>
            <Icon svg={MagnifyingGlass} className="size-6" />
          </IconButton>
        </div>
      </section>

      <section className="space-y-4">
        <Text size="heading-lg" color="primary">Icon</Text>
        <div className="flex items-center gap-4">
          <Icon svg={MagnifyingGlass} className="size-6 text-green-100" />
          <Icon svg={MagnifyingGlass} className="size-6 text-gray-200" />
          <Icon svg={MagnifyingGlass} className="size-8 text-green-100" />
        </div>
      </section>

      <section className="space-y-4">
        <Text size="heading-lg" color="primary">NavLink</Text>
        <div className="flex items-center gap-2">
          <NavLink to="/">Default</NavLink>
          <NavLink to="/" isActive>Active</NavLink>
        </div>
      </section>

      <section className="space-y-4">
        <Text size="heading-lg" color="primary">Input</Text>
        <div className="flex max-w-sm flex-col gap-4">
          <Input label="Label" placeholder="Placeholder" />
          <Input label="Label" defaultValue="Text" />
        </div>
      </section>

      <section className="space-y-4">
        <Text size="heading-lg" color="primary">SelectField</Text>
        <div className="flex max-w-sm flex-col gap-4">
          <SelectField
            labelText="Categoria"
            placeholder="Selecione"
            options={[
              { value: "alimentacao", label: "Alimentação" },
              { value: "hospedagem", label: "Hospedagem" },
              { value: "transporte", label: "Transporte" },
              { value: "servicos", label: "Serviços" },
              { value: "outros", label: "Outros" },
            ]}
          />
          <SelectField
            labelText="Categoria"
            options={[
              { value: "alimentacao", label: "Alimentação" },
              { value: "hospedagem", label: "Hospedagem" },
              { value: "transporte", label: "Transporte" },
              { value: "servicos", label: "Serviços" },
              { value: "outros", label: "Outros" },
            ]}
            value="alimentacao"
          />
          <SelectField
            labelText="Categoria"
            options={[
              { value: "alimentacao", label: "Alimentação" },
              { value: "hospedagem", label: "Hospedagem" },
              { value: "transporte", label: "Transporte" },
              { value: "servicos", label: "Serviços" },
              { value: "outros", label: "Outros" },
            ]}
            error="Campo obrigatório"
          />
        </div>
      </section>
    </div>
  )
}
