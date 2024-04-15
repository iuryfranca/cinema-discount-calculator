import { useState } from 'react'
import './App.css'
import { CardCadastroLei } from './components/card-cadastro-lei'
import {
  getFinalDiscount,
  ruleLegislation,
  ruleLegislationList,
} from './lib/calculator'
import { Label } from './components/ui/label'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './components/ui/accordion'
import { Badge } from './components/ui/badge'
import { Input } from './components/ui/input'
import { Switch } from './components/ui/switch'
import { DatePicker } from './components/date-picker'
import {
  CardCadastroCliente,
  INewClient,
} from './components/card-cadastro-cliente'

function App() {
  const [listaLeis, setListaLeis] =
    useState<ruleLegislation[]>(ruleLegislationList)
  const [listaClientes, setListaClientes] = useState<INewClient[]>([])

  return (
    <div className='bg-background text-foreground min-h-screen h-full w-[1366px] mx-auto my-10 grid grid-cols-2 gap-16'>
      <div className='flex flex-col gap-5'>
        <CardCadastroLei
          fatherCallback={(e: ruleLegislation) =>
            setListaLeis([...listaLeis, e])
          }
        />
        <CardCadastroCliente
          fatherCallback={(e: INewClient) =>
            setListaClientes([...listaClientes, e])
          }
        />
      </div>
      <div className='grid grid-rows-2 gap-4'>
        <div className='flex flex-col space-x-2'>
          <Label htmlFor='necessary' className='flex flex-col space-y-1'>
            <span>Leis Criadas</span>
          </Label>
          <Accordion type='multiple'>
            {listaLeis.length > 0 &&
              listaLeis.map((newRule, index) => (
                <AccordionItem value={`${index}`}>
                  <AccordionTrigger>{newRule.descricao}</AccordionTrigger>
                  <AccordionContent>
                    <div className='grid gap-6'>
                      <div className='grid grid-cols-2 gap-4'>
                        <div className='grid gap-2'>
                          <Label htmlFor='area'>Gêneros de filmes</Label>
                          <div className='text-xs flex gap-x-2 gap-y-1 flex-row flex-wrap'>
                            {newRule.generos.map((genre) => (
                              <div>
                                <Badge>{genre}</Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className='grid gap-2'>
                          <Label htmlFor='area'>Ocupação</Label>
                          <div className='text-xs flex gap-x-2 gap-y-1 flex-row flex-wrap'>
                            {newRule.ocupacao.map((ocupacao) => (
                              <div>
                                <Badge>{ocupacao}</Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className='grid grid-cols-2 gap-4'>
                        <div className='grid gap-2'>
                          <Label htmlFor='subject'>Quantos Dependentes</Label>
                          <div className='grid gap-2'>
                            <Input
                              id='subject'
                              placeholder='0'
                              type='number'
                              disabled={true}
                              value={
                                newRule.qtdDependentes
                                  ? newRule.qtdDependentes
                                  : 'Não importa'
                              }
                            />
                            <div className='flex items-center justify-between space-x-2'>
                              <Label
                                htmlFor='necessary'
                                className='flex flex-col space-y-1'
                              >
                                <span>Não importa</span>
                              </Label>
                              <Switch
                                checked={newRule.qtdDependentes === null}
                                disabled={true}
                                defaultChecked
                              />
                            </div>
                          </div>
                        </div>
                        <div className='grid gap-2'>
                          <div className='grid gap-2'>
                            <div className='flex items-center justify-between space-x-2'>
                              <Label
                                htmlFor='necessary'
                                className='flex flex-col space-y-1'
                              >
                                <span>É acumulativo</span>
                              </Label>
                              <Switch
                                checked={newRule.acumulativo}
                                disabled={true}
                                defaultChecked
                              />
                            </div>
                            <div className='flex items-center justify-between space-x-2'>
                              <Label
                                htmlFor='necessary'
                                className='flex flex-col space-y-1'
                              >
                                <span>É baixa renda</span>
                              </Label>
                              <Switch
                                checked={newRule.baixaRenda}
                                disabled={true}
                                defaultChecked
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='grid grid-cols-2 gap-4'>
                        <div className='grid gap-2'>
                          <Label htmlFor='subject'>
                            Data para entrar em vigor
                          </Label>
                          <DatePicker
                            defaultDate={newRule.dataVigor}
                            disabled={true}
                          />
                        </div>
                        <div className='grid gap-2'>
                          <Label htmlFor='subject'>Data de vencimento</Label>
                          <DatePicker
                            disabled={true}
                            defaultDate={newRule.dataValidade}
                          />
                          <div className='flex items-center justify-between space-x-2'>
                            <Label
                              htmlFor='necessary'
                              className='flex flex-col space-y-1'
                            >
                              <span>Não importa</span>
                            </Label>
                            <Switch
                              checked={newRule.dataValidade === null}
                              disabled={true}
                              defaultChecked
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
        <Accordion type='multiple'>
          {listaClientes.length > 0 &&
            listaClientes.map((newClient, index) => (
              <AccordionItem value={`${index}`}>
                <AccordionTrigger className='flex flex-row justify-between items-center'>
                  {newClient.nameClient}

                  <span>
                    Desconto [
                    {getFinalDiscount(
                      newClient.ocupacao,
                      newClient.generos,
                      newClient.qtdDependentes,
                      newClient.baixaRenda
                    ) * 100}
                    %]
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className='grid gap-6'>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='flex flex-col'>
                        <Label htmlFor='area'>Gêneros de filmes</Label>
                        <div className='text-xs flex gap-x-2 gap-y-1 flex-row flex-wrap'>
                          {newClient.generos.map((genre) => (
                            <div>
                              <Badge>{genre}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className='grid gap-2'>
                        <Label htmlFor='area'>Ocupação</Label>
                        <div className='text-xs flex gap-x-2 gap-y-1 flex-row flex-wrap'>
                          {newClient.ocupacao.map((ocupacao) => (
                            <div>
                              <Badge>{ocupacao}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='grid gap-2'>
                        <Label htmlFor='subject'>Quantos Dependentes</Label>
                        <div className='grid gap-2'>
                          <Input
                            id='subject'
                            placeholder='0'
                            type='number'
                            disabled={true}
                            value={
                              newClient.qtdDependentes
                                ? newClient.qtdDependentes
                                : 'Não importa'
                            }
                          />
                          <div className='flex items-center justify-between space-x-2'>
                            <Label
                              htmlFor='necessary'
                              className='flex flex-col space-y-1'
                            >
                              <span>Não importa</span>
                            </Label>
                            <Switch
                              checked={newClient.qtdDependentes === null}
                              disabled={true}
                              defaultChecked
                            />
                          </div>
                        </div>
                      </div>
                      <div className='grid gap-2'>
                        <div className='grid gap-2'>
                          <div className='flex items-center justify-between space-x-2'>
                            <Label
                              htmlFor='necessary'
                              className='flex flex-col space-y-1'
                            >
                              <span>É baixa renda</span>
                            </Label>
                            <Switch
                              checked={newClient.baixaRenda}
                              disabled={true}
                              defaultChecked
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </div>
    </div>
  )
}

export default App
