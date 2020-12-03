<template>
<div >
    <!-- primeira linha-->
    <div class="row justify-around q-mt-md">
        <q-select
          dense
          v-model="model"
          :options="clientes"
          label="Cliente"
          class="col-xs-6 col-md-6 col-sm-6 col-lg-6"
          >
        </q-select>
        <!-- Botão de taxas-->
        <Taxas/>
        <!-- Botão de adicionar itens-->
        <q-btn  size="md" round color="primary" icon="add_shopping_cart"  @click="prompt = true" />
        <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">

        <q-card-section>
          <div class="text-h6">adicione um item</div>
          <q-separator   />
        </q-card-section>

        <q-card-section>
            <q-form class="row" >

            <q-select 
            v-model="produtoSelecionado" 
            dense  
            :options="produtos" 
            map-options
            option-label="nome" 
            class="col-md-7 col-sm-7 col-xs-7" 
            label="Produtos">
            </q-select>
            
            
            <q-input v-model="produtoSelecionado.valor" prefix="R$" bg-color="green" dense outlined class="col-md-5 col-sm-5 col-xs-5 q-pa-md"/>
            <q-input label="Peso" v-model="pesoProd" dense type="number" class="col-md-7 col-sm-7 col-xs-7"/>
            <q-input v-model="valFinal" prefix="R$" dense outlined bg-color="green" class="col-md-5 col-sm-5 col-xs-5 q-pa-md"/>
    </q-form>
        </q-card-section>

        

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Adicionar pedido" v-close-popup @click="addItem"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>
    <!--segunda div, linha para adicionar a tabela-->
    <div class="row justify-center q-mt-xl">
    <q-table
    style="height: 200px"
    flat
    dense
    hide-bottom
    :data="listaProdutos"
    :columns="colunas"
    row-key="nome"
    virtual-scroll
    :pagination.sync="pagination"
    :rows-per-page-options="[0]"
    >
        <template v-slot:body="props">
            <q-tr :props="props">
                <q-td key="nome" :props="props">{{props.row.nome}}</q-td>
                <q-td key="preco" :props="props">{{formatMoney(props.row.preco)}}</q-td>
                <q-td key="peso" :props="props">{{props.row.peso}}</q-td>
                <q-td key="valor" :props="props">{{formatMoney(props.row.valor)}}</q-td>
            </q-tr>
        </template>
    </q-table>
</div>
<div class="row">
  <q-separator class="q-mt-xl"></q-separator>
  <h5 class="text-body2 q-ml-xs ">Pedido: #{{this.$store.state.store.order.id}}</h5>

</div>
<div class="row">
  <div class="col q-ml-xs">
  <p class="text-body2">Subtotal:</p>
  <p class="text-body2">Taxa de entrega</p>
  
  <p class="text-body2">Total: </p>

</div>
<div class="col items-end">
  <p class="text-body2">{{formatMoney(ValorSubtotal)}}</p>
  <p class="text-body2">{{formatMoney(valorDelly)}}</p>
  
  <p class="text-body2">{{formatMoney(valorTotal)}}</p>

</div>

</div>
    

</div>

</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import Taxas from '../components/Taxas'
export default {
  name: 'PageIndex',
  components: { Taxas },

  data(){
    return{
      order: {
        id: Math.floor(Math.random() * 1000),
        subtotal:0,
        dellivery: 0,
        desc: 0,
        total: 0

      },
      pagination: {
        rowsPerPage: 0
      },
      model: null,
      prompt: false,
      pesoProd: '',
      valFinal: '',
      valProdSelect: '',
      clientes: ['Luan', 'Roberto'],
      colunas: [
        { name: 'nome', label: 'Nome', field: 'nome'},
        { name: 'preco', label: 'Preço', field: 'preco'}, 
        { name: 'peso', label: 'Peso', field: 'peso'}, 
        { name: 'valor', label: 'Valor Final', field: 'valor'}
        ],
      
      listaProdutos: [],
      produtoSelecionado:{
        nome:'',
        valor: ''
      },
      produtos: [
            {nome: 'Costela 481' , valor: 99.00},
            {nome: 'Picanha angus' , valor: 120.00},
            {nome: 'Contra filé' , valor: 150.00},
      ],
    }
  },
  updated() {
    this.carregaItens()
  },
  computed: {
    ...mapGetters('store', ['ValorSubtotal', 'valorDesconto', 'valorDelly', 'valorTotal'])
  },
  methods: {
    formatMoney(value) {
      const formatter  = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
      return formatter.format(value)
    },
   
     carregaItens(){
         this.listaProdutos = this.$store.state.store.order.orderItems
       },
    ...mapMutations('store', ['addProduto']),
            addItem(){
              const novoProduto = {
                nome: this.produtoSelecionado.nome,
                preco: parseFloat(this.produtoSelecionado.valor),
                peso: parseFloat(this.pesoProd),
                valor: parseFloat(this.valFinal)
              }
              this.addProduto(novoProduto)
              
            },
  },
  watch: {
        pesoProd(){
            this.pesoProd != 0 ? this.valFinal = this.produtoSelecionado.valor * this.pesoProd: this.valFinal =0
        },
        
    }
}
</script>
