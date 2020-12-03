<template>
  <div>
            <!-- Botão do dialog das taxas/descontos-->
      <q-btn  size="md" round color="primary" icon="tune"  @click="btntaxas = true" />   

      <q-dialog v-model="btntaxas" persistent>
          <q-card  style="width: 300px">
            <q-card-section>
              <div class="text-h6">Gerenciador de taxas</div>
              <q-separator   />
            </q-card-section>

            <q-card-section>
              
              <q-select
              class="row col-md-6 col-xs-6"
              label="Tipo"
              emit-value
              map-options
              v-model="taxa.tipo"
              :options="selectTaxas"

              >

              </q-select>

              <q-input label="Valor" type="number" v-model.number="taxa.valor"/>

            </q-card-section>
            <q-card-actions align="right" class="text-primary">
              <q-btn label="Cancelar" v-close-popup></q-btn>
              <q-btn label="Salvar" v-close-popup @click="add"></q-btn>
            </q-card-actions>

          </q-card>

      </q-dialog>  
  </div>
</template>

<script>
 import {mapGetters, mapMutations} from 'vuex'
export default {
    name: 'Taxas',
    data(){
        return{
            btntaxas: false,
            selectTaxas: [
                {label: 'Desconto', value: 'desconto'},
                {label: 'Taxa Entrega', value: 'txdellivery'}
            ],
            taxa:{
                tipo:'',
                valor: ''
      },
        }
    },

    updated() {

    },
    
    methods:{
        ...mapMutations('store', ['addTaxa']),

        add(){
            const novaTaxa = {
                tipo: this.taxa.tipo,
                valor: this.taxa.valor
              }
              this.addTaxa(novaTaxa)
              
        },
        

    }

}
</script>

<style>

</style>