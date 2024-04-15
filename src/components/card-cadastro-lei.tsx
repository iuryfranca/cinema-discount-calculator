'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { genres, occupations, ruleLegislation } from '@/lib/calculator'
import { useState } from 'react'
import { Badge } from './ui/badge'
import { X } from 'lucide-react'
import { Switch } from './ui/switch'
import { DatePicker } from './date-picker'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CardCadastroLei({ fatherCallback }: any) {
  const [newRule, setNewRule] = useState<ruleLegislation>({
    descricao: 'Estudante para pagar 50% do valor do ingresso',
    acumulativo: false,
    desconto: 0.5,
    generos: ['AVENTURA'],
    ocupacao: ['ESTUDANTE'],
    qtdDependentes: null,
    dataVigor: new Date(),
    dataValidade: new Date('2026-12-31'),
    baixaRenda: false,
  })

  function createNewRule() {
    fatherCallback(newRule)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criando nova Lei</CardTitle>
      </CardHeader>
      <CardContent className='grid gap-6'>
        <div className='grid gap-2'>
          <Label htmlFor='description'>Descrição</Label>
          <Textarea
            id='description'
            value={newRule.descricao}
            onChange={(e) =>
              setNewRule({ ...newRule, descricao: e.target.value })
            }
            placeholder='Please include all information relevant to your issue.'
          />
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='area'>Gêneros de filmes</Label>
            <Select
              onValueChange={(newGereno) =>
                setNewRule({
                  ...newRule,
                  generos: [...newRule.generos, newGereno],
                } as ruleLegislation)
              }
            >
              <SelectTrigger id='area'>
                <SelectValue placeholder='Selecione um gênero' />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className='text-xs flex gap-x-2 gap-y-1 flex-row flex-wrap'>
              {newRule.generos.map((genre) => (
                <div>
                  <Badge>
                    {genre}{' '}
                    <X
                      className='w-4 h-4 cursor-pointer ml-2 hover:text-red-500'
                      onClick={() => {
                        const newArray = newRule.generos
                        newArray.splice(newArray.indexOf(genre), 1)
                        setNewRule({
                          ...newRule,
                          generos: newArray,
                        } as ruleLegislation)
                      }}
                    />
                  </Badge>
                </div>
              ))}
            </div>
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='area'>Ocupação</Label>
            <Select
              onValueChange={(newOcupacao) =>
                setNewRule({
                  ...newRule,
                  ocupacao: [...newRule.ocupacao, newOcupacao],
                } as ruleLegislation)
              }
            >
              <SelectTrigger id='area'>
                <SelectValue placeholder='Selecione uma ocupação' />
              </SelectTrigger>
              <SelectContent>
                {occupations.map((ocupacao) => (
                  <SelectItem key={ocupacao} value={ocupacao}>
                    {ocupacao}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className='text-xs flex gap-x-2 gap-y-1 flex-row flex-wrap'>
              {newRule.ocupacao.map((ocupacao) => (
                <div>
                  <Badge>
                    {ocupacao}{' '}
                    <X
                      className='w-4 h-4 cursor-pointer ml-2 hover:text-red-500'
                      onClick={() => {
                        const newArray = newRule.ocupacao
                        newArray.splice(newArray.indexOf(ocupacao), 1)
                        setNewRule({
                          ...newRule,
                          ocupacao: newArray,
                        } as ruleLegislation)
                      }}
                    />
                  </Badge>
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
                disabled={newRule.qtdDependentes === null}
                onChange={(e) =>
                  setNewRule({
                    ...newRule,
                    qtdDependentes: Number(e.target.value),
                  })
                }
              />
              <div className='flex items-center justify-between space-x-2'>
                <Label htmlFor='necessary' className='flex flex-col space-y-1'>
                  <span>Não importa</span>
                </Label>
                <Switch
                  checked={newRule.qtdDependentes === null}
                  onCheckedChange={() => {
                    if (newRule.qtdDependentes === null) {
                      setNewRule({
                        ...newRule,
                        qtdDependentes: 0,
                      } as ruleLegislation)
                    } else {
                      setNewRule({
                        ...newRule,
                        qtdDependentes: null,
                      } as ruleLegislation)
                    }

                    newRule.qtdDependentes === null
                      ? setNewRule({
                          ...newRule,
                          qtdDependentes: 0,
                        } as ruleLegislation)
                      : setNewRule({
                          ...newRule,
                          qtdDependentes: null,
                        } as ruleLegislation)
                  }}
                  defaultChecked
                />
              </div>
            </div>
          </div>
          <div className='grid gap-2'>
            <div className='grid gap-2'>
              <div className='flex items-center justify-between space-x-2'>
                <Label htmlFor='necessary' className='flex flex-col space-y-1'>
                  <span>É acumulativo</span>
                </Label>
                <Switch
                  checked={newRule.acumulativo}
                  onCheckedChange={() =>
                    setNewRule({
                      ...newRule,
                      acumulativo: !newRule.acumulativo,
                    } as ruleLegislation)
                  }
                  defaultChecked
                />
              </div>
              <div className='flex items-center justify-between space-x-2'>
                <Label htmlFor='necessary' className='flex flex-col space-y-1'>
                  <span>É baixa renda</span>
                </Label>
                <Switch
                  checked={newRule.baixaRenda}
                  onCheckedChange={() =>
                    setNewRule({
                      ...newRule,
                      baixaRenda: !newRule.baixaRenda,
                    } as ruleLegislation)
                  }
                  defaultChecked
                />
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='subject'>Data para entrar em vigor</Label>
            <DatePicker />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='subject'>Data de vencimento</Label>
            <DatePicker disabled={newRule.dataValidade === null} />
            <div className='flex items-center justify-between space-x-2'>
              <Label htmlFor='necessary' className='flex flex-col space-y-1'>
                <span>Não importa</span>
              </Label>
              <Switch
                checked={newRule.dataValidade === null}
                onCheckedChange={() =>
                  newRule.dataValidade === null
                    ? setNewRule({
                        ...newRule,
                        dataValidade: new Date(),
                      } as ruleLegislation)
                    : setNewRule({
                        ...newRule,
                        dataValidade: null,
                      } as ruleLegislation)
                }
                defaultChecked
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className='justify-between space-x-2'>
        <Button variant='ghost'>Cancel</Button>
        <Button onClick={createNewRule}>Criar</Button>
      </CardFooter>
    </Card>
  )
}
