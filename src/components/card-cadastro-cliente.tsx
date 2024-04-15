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
import { genres, occupations } from '@/lib/calculator'
import { useState } from 'react'
import { Badge } from './ui/badge'
import { X } from 'lucide-react'
import { Switch } from './ui/switch'

export interface INewClient {
  nameClient: string
  ocupacao: (typeof occupations)[number][]
  generos: (typeof genres)[number][]
  qtdDependentes: number
  baixaRenda: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CardCadastroCliente({ fatherCallback }: any) {
  const [newClient, setNewClient] = useState<INewClient>({
    nameClient: 'João',
    generos: ['ANIMAÇÃO'],
    ocupacao: ['ECONOMISTA'],
    qtdDependentes: 3,
    baixaRenda: false,
  })

  function createNewRule() {
    fatherCallback(newClient)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criando novo Cliente</CardTitle>
      </CardHeader>
      <CardContent className='grid gap-6'>
        <div className='grid gap-2'>
          <Label htmlFor='subject'>Nome Cliente</Label>
          <div className='grid gap-2'>
            <Input
              id='subject'
              placeholder='João'
              onChange={(e) =>
                setNewClient({
                  ...newClient,
                  nameClient: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='area'>Gêneros de filmes</Label>
            <Select
              onValueChange={(newGereno) =>
                setNewClient({
                  ...newClient,
                  generos: [...newClient.generos, newGereno],
                } as INewClient)
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
              {newClient?.generos &&
                newClient.generos.map((genre) => (
                  <div>
                    <Badge>
                      {genre}{' '}
                      <X
                        className='w-4 h-4 cursor-pointer ml-2 hover:text-red-500'
                        onClick={() => {
                          const newArray = newClient.generos
                          newArray.splice(newArray.indexOf(genre), 1)
                          setNewClient({
                            ...newClient,
                            generos: newArray,
                          } as INewClient)
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
                setNewClient({
                  ...newClient,
                  ocupacao: [
                    ...newClient.ocupacao,
                    newOcupacao,
                  ] as unknown as (typeof occupations)[number][],
                })
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
              {newClient?.ocupacao &&
                newClient.ocupacao.map((ocupacao) => (
                  <div>
                    <Badge>
                      {ocupacao}{' '}
                      <X
                        className='w-4 h-4 cursor-pointer ml-2 hover:text-red-500'
                        onClick={() => {
                          const newArray = newClient.ocupacao
                          newArray.splice(newArray.indexOf(ocupacao), 1)
                          setNewClient({
                            ...newClient,
                            ocupacao: newArray,
                          } as INewClient)
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
                onChange={(e) =>
                  setNewClient({
                    ...newClient,
                    qtdDependentes: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>
          <div className='grid gap-2'>
            <div className='grid gap-2'>
              <div className='flex items-center justify-between space-x-2'>
                <Label htmlFor='necessary' className='flex flex-col space-y-1'>
                  <span>É baixa renda</span>
                </Label>
                <Switch
                  checked={newClient.baixaRenda}
                  onCheckedChange={() =>
                    setNewClient({
                      ...newClient,
                      baixaRenda: !newClient.baixaRenda,
                    } as INewClient)
                  }
                  defaultChecked
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className='justify-between space-x-2'>
        <Button variant='ghost'>Cancel</Button>
        <Button onClick={createNewRule}>Criar Cliente</Button>
      </CardFooter>
    </Card>
  )
}
