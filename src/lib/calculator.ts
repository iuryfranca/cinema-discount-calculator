/* problema

Programa social criado pelo ministerio da cultura, que concede descontos em cinemas

Contem uma série de leis que garantem um desconto de até 50%, e os descontos PODEM ser acumulativos, 
caso a pessoa se enquandre em mais de uma faixa de isenção:

LEI 001 - Estudante(cod ocupação 1)                                           Paga meia (Todos os gêneros)
LEI 002 - Familia de baixa renda com +2 dependentes                           - 25% (valido somente para os generos INFANTIL, FICÇÃO, AVENTURA, DRAMA e COMÉDIA)
LEI 003 - Desempregado(cod ocupação 0)                                        - 20% (Todos os gêneros) (entra em vigor em 01/01/2026)
LEI 004 - Aposentados(cod ocupação 2) e pensionistas(cod ocupação 3)          - 15% (Todos os gêneros) ( acumulativo , Válida somente até o final de 2024)

*/

/**
* Ponderações sobre as combinações de regra de negócio

* Ocupações 
* 
* ocupação deve ser tratado como lista por motivos dê:
* - Uma pessoa pode ter mais que uma ocupação e se pelo uma das ocupações entrar numa lei, ele tem o direto de ter aquele desconto
* - qualquer regra que exija pelo menos uma ocupação e o cliente não puder atendê-la terá que sair do cálculo final

* Gêneros de Filmes
* 
* gênero deve ser tratado como lista por motivos dê:
* - Uma pessoa pode quiser ver um filme com mais de um gênero e pelo menos um desses gêneros entrar do 
*   cadastro da lei, ele deve ter o direto de ter aquele desconto
* - qualquer regra que exija pelo menos um gênero e o cliente não tiver vendo um filme com aquele genero, terá que sair do cálculo final

* Acumulativo 
* 
* a lógica de descontos acumulativos deve ser tratado da seguinte forma:
* - o valor final do desconto deve ser sempre o de maior valor do desconto possível, se duas regras, uma 
* com descontos acumulativos entrar em conflito com uma regra de desconto não acumulativo deverá pegar o 
* maior valor, exemplo: uma pessoa é estudante e irá ver um filme 'EDUCATIVO' e 'GOVERNAMENTAL'. A regra de estudante não é 
* acumulativa e da 50% de desconto enquanto a regra de filmes educativos e governamentais são acumulativas e dão 
* juntos, 35% de desconto, nesse caso o cliente final recebe apenas 50% de desconto. Se as regras acumulativas tivessem 
* um desconto maior, no final, ela que seria aplicada e caso a regra de ser ESTUDANTE também fosse 
* acumulativa, o desconto final seria de 85%
* 
* Quantidade de Dependentes 
* 
* a quantidade de dependentes deve ser tratado como um número inteiro ou null, por motivos de:
* - Se o cliente não tiver dependentes, o valor deve ser 0
* - Se o cliente tiver dependentes, o valor deve ser maior que 0
* - Se o valor for null, nao importa a quantidade de dependentes que o cliente tenha, ele terá direito ao desconto
*/

export interface ruleLegislation {
  descricao: string
  ocupacao: (typeof occupations)[number][]
  acumulativo: boolean
  desconto: number
  generos: (typeof genres)[number][]
  dataVigor: Date
  dataValidade: Date | null
  qtdDependentes: number | null
  baixaRenda: boolean
}

export const occupations = [
  'ESTUDANTE',
  'APOSENTADO',
  'PENSIONISTA',
  'PROFESSOR',
  'POLICIAL',
  'BOMBEIRO',
  'MILITAR',
  'ENFERMEIRO',
  'MÉDICO',
  'FARMACÊUTICO',
  'FISIOTERAPEUTA',
  'NUTRICIONISTA',
  'PSICÓLOGO',
  'VETERINÁRIO',
  'ENGENHEIRO',
  'ARQUITETO',
  'ADMINISTRADOR',
  'CONTADOR',
  'ECONOMISTA',
  'ADVOGADO',
  'JORNALISTA',
  'PUBLICITÁRIO',
  'DESEMPREGADO',
] as const

export const genres = [
  'INFANTIL',
  'COMEDIA',
  'FICÇÃO',
  'EDUCATIVO',
  'ROMANCE',
  'TERROR',
  'AVENTURA',
  'AÇÃO',
  'DRAMA',
  'DOCUMENTÁRIO',
  'GOVERNAMENTAL',
  'FANTASIA',
  'MUSICAL',
  'SUSPENSE',
  'ANIMAÇÃO',
  'FAROESTE',
  'POLICIAL',
  'GUERRA',
  'HISTÓRICO',
  'BIOGRAFIA',
  'FICÇÃO CIENTÍFICA',
  'FANTASIA CIENTÍFICA',
  'ERÓTICO',
  'MISTÉRIO',
  'ESPIONAGEM',
  'SUPER-HERÓI',
] as const

export const ruleLegislationList: ruleLegislation[] = []

export function createNewRule({
  acumulativo,
  desconto,
  descricao,
  generos,
  ocupacao,
  qtdDependentes,
  dataValidade,
  dataVigor,
}: ruleLegislation) {
  const newRule: ruleLegislation = {
    descricao: descricao,
    acumulativo: acumulativo,
  } as ruleLegislation

  if (desconto > 0.5) {
    throw new Error('Desconto não pode ser maior que 50%')
  }

  if (qtdDependentes && qtdDependentes < 0) {
    throw new Error('Quantidade de dependentes não pode ser menor que 0')
  }

  if (generos.length === 0) {
    throw new Error('Genero não pode ser vazio')
  }

  if (dataValidade && dataValidade < new Date()) {
    throw new Error('Data de dataValidade não pode ser menor que a data atual')
  }

  newRule.qtdDependentes = qtdDependentes
  newRule.desconto = desconto
  newRule.dataValidade = dataValidade
  newRule.dataVigor = dataVigor
  newRule.generos = [...generos]
  newRule.ocupacao = [...ocupacao]

  ruleLegislationList.push(newRule)
}

// Criando regras manualmente mas o ideal seria ter uma implementação com front

// LEI 001 - Estudante(cod ocupação 1)                                           Paga meia (Todos os gêneros)
// LEI 002 - Familia de baixa renda com +2 dependentes                           - 25% (valido somente para os generos INFANTIL, FICÇÃO, AVENTURA, DRAMA e COMÉDIA)
// LEI 003 - Desempregado(cod ocupação 0)                                        - 20% (Todos os gêneros) (entra em vigor em 01/01/2026)
// LEI 004 - Aposentados(cod ocupação 2) e pensionistas(cod ocupação 3)          - 15% (Todos os gêneros) ( acumulativo , Válida somente até o final de 2024)

createNewRule({
  descricao: 'Estudante para pagar 50% do valor do ingresso',
  acumulativo: false,
  desconto: 0.5,
  generos: [...genres],
  ocupacao: ['ESTUDANTE'],
  qtdDependentes: null,
  dataVigor: new Date(),
  dataValidade: new Date('2026-12-31'),
  baixaRenda: false,
})

createNewRule({
  descricao:
    'Estudante que assiste o gênero "EDUCATIVO" terá 15% de desconto acumulativo',
  acumulativo: true,
  desconto: 0.15,
  generos: ['EDUCATIVO'],
  ocupacao: ['ESTUDANTE'],
  qtdDependentes: null,
  dataVigor: new Date(),
  dataValidade: new Date('2026-12-31'),
  baixaRenda: false,
})

createNewRule({
  descricao: 'Gênero "GOVERNAMENTAL" terá 25% de desconto acumulativo',
  acumulativo: true,
  desconto: 0.25,
  generos: ['GOVERNAMENTAL'],
  ocupacao: [...occupations],
  qtdDependentes: null,
  dataVigor: new Date(),
  dataValidade: new Date('2026-12-31'),
  baixaRenda: false,
})

createNewRule({
  descricao: 'Familia de baixa renda com +2 dependentes terá 25% de desconto',
  acumulativo: false,
  desconto: 0.25,
  generos: ['INFANTIL', 'FICÇÃO', 'AVENTURA', 'DRAMA', 'COMEDIA'],
  ocupacao: [...occupations],
  qtdDependentes: 2,
  dataVigor: new Date(),
  dataValidade: null,
  baixaRenda: true,
})

//Mudei um pouco a regra para filtrar especificamente por dependente 0
createNewRule({
  descricao: 'Desempregado terá 20% de desconto e não poderá ter dependentes',
  acumulativo: false,
  desconto: 0.2,
  generos: [...genres],
  ocupacao: ['DESEMPREGADO'],
  qtdDependentes: 0,
  dataVigor: new Date('2026-01-01'),
  dataValidade: null,
  baixaRenda: false,
})

createNewRule({
  descricao: 'Aposentados e pensionistas terão 15% de desconto',
  acumulativo: true,
  desconto: 0.15,
  generos: [...genres],
  ocupacao: ['APOSENTADO', 'PENSIONISTA'],
  qtdDependentes: null,
  dataVigor: new Date(),
  dataValidade: new Date('2024-12-31'),
  baixaRenda: false,
})

export function getFinalDiscount(
  ocupacoes: (typeof occupations)[number][],
  generos: (typeof genres)[number][],
  qtdDependentes: number,
  baixaRenda: boolean
) {
  const rulesChecked = ruleLegislationList.filter((rule) => {
    //Se tiver pelo menos uma ocupação que está na regra
    // const hasOcupacao = rule.ocupacao.includes(ocupacao)
    const hasOcupacao = ocupacoes.some((ocupacao) =>
      rule.ocupacao.includes(ocupacao)
    )

    //Se tiver pelo menos um gênero que está na regra
    const hasGeneros = generos.some((genero) => rule.generos.includes(genero))

    //Se a quantidade de dependentes for igual a regra ou a regra for null (não importa a quantidade de dependentes)
    const hasQtdDependentes =
      (rule.qtdDependentes !== null && qtdDependentes >= rule.qtdDependentes) ||
      rule.qtdDependentes === null

    //Se a pessoa for de baixa renda e a regra for para pessoas de baixa renda ou a regra não for para pessoas de baixa renda
    const hasBaixaRenda = rule.baixaRenda === baixaRenda || !rule.baixaRenda

    //Se a data de validade for null ou a data de validade for maior que a data atual
    const hasDataValidade =
      rule.dataValidade === null || rule.dataValidade > new Date()

    //Se a data de vigor for menor que a data atual
    const hasDataVigor = rule.dataVigor < new Date()

    //Se todas as regras forem verdadeiras, a regra passou
    return (
      hasOcupacao &&
      hasGeneros &&
      hasQtdDependentes &&
      hasBaixaRenda &&
      hasDataValidade &&
      hasDataVigor
    )
  })

  if (!rulesChecked || rulesChecked.length === 0) {
    console.log('maiorDesconto', 0)

    return 0
  }

  const rulesCheckedNaoAcumulativo = rulesChecked.filter(
    (rule) => !rule.acumulativo
  )

  const rulesCheckedAcumulativo = rulesChecked.filter(
    (rule) => rule.acumulativo
  )

  const maiorDescontoNaoAcumulativo = rulesCheckedNaoAcumulativo.reduce(
    (acc, rule) => (rule.desconto > acc ? rule.desconto : acc),
    0
  )

  const maiorDescontoAcumulativo = rulesCheckedAcumulativo.reduce(
    (acc, rule) => acc + rule.desconto,
    0
  )

  if (maiorDescontoAcumulativo > maiorDescontoNaoAcumulativo)
    return maiorDescontoAcumulativo

  return maiorDescontoNaoAcumulativo
}
