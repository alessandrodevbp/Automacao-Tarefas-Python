// ============================================
// SISTEMA DE CADASTRO DE PRODUTOS
// ============================================

class GerenciadorProdutos {
    constructor() {
        this.form = document.getElementById('formCadastro');
        this.mensagemSucesso = document.getElementById('successMessage');
        this.produtos = this.carregarProdutos();
        this.inicializar();
    }

    // Inicializar os event listeners
    inicializar() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.enviarFormulario(e));
        }
        
        // Carrega produtos ao iniciar
        console.log('Sistema de cadastro inicializado');
        console.log(`Total de produtos cadastrados: ${this.produtos.length}`);
    }

    // Enviar formulário
    enviarFormulario(e) {
        e.preventDefault();

        // Obter valores do formulário
        const novaoProduto = {
            id: this.gerarID(),
            codigo: document.getElementById('codigo').value.trim(),
            marca: document.getElementById('marca').value.trim(),
            tipo: document.getElementById('tipo').value.trim(),
            categoria: document.getElementById('categoria').value.trim(),
            precoUnitario: parseFloat(document.getElementById('precoUnitario').value),
            custo: parseFloat(document.getElementById('custo').value),
            obs: document.getElementById('obs').value.trim(),
            dataCadastro: new Date().toLocaleString('pt-BR')
        };

        // Validar dados
        if (!this.validarProduto(novaoProduto)) {
            return;
        }

        // Verificar se código já existe
        if (this.codigoExiste(novaoProduto.codigo)) {
            alert('❌ Erro: Produto com este código já existe!');
            return;
        }

        // Adicionar ao array
        this.produtos.push(novaoProduto);

        // Salvar no localStorage
        this.salvarProdutos();

        // Mostrar mensagem de sucesso
        this.exibirMensagemSucesso();

        // Limpar formulário
        this.form.reset();

        // Log
        console.log('✓ Produto cadastrado com sucesso:', novaoProduto);
    }

    // Validar dados do produto
    validarProduto(produto) {
        if (!produto.codigo || produto.codigo === '') {
            alert('❌ Código é obrigatório');
            return false;
        }

        if (!produto.marca || produto.marca === '') {
            alert('❌ Marca é obrigatória');
            return false;
        }

        if (!produto.tipo || produto.tipo === '') {
            alert('❌ Tipo é obrigatório');
            return false;
        }

        if (!produto.categoria || produto.categoria === '') {
            alert('❌ Categoria é obrigatória');
            return false;
        }

        if (isNaN(produto.precoUnitario) || produto.precoUnitario <= 0) {
            alert('❌ Preço Unitário deve ser maior que 0');
            return false;
        }

        if (isNaN(produto.custo) || produto.custo <= 0) {
            alert('❌ Custo deve ser maior que 0');
            return false;
        }

        if (produto.precoUnitario < produto.custo) {
            alert('❌ Preço Unitário não pode ser menor que o Custo');
            return false;
        }

        return true;
    }

    // Verificar se código já existe
    codigoExiste(codigo) {
        const codigoLimpo = codigo.trim().toLowerCase();
        return this.produtos.some(produto => produto.codigo.trim().toLowerCase() === codigoLimpo);
    }

    // Gerar ID único
    gerarID() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    // Exibir mensagem de sucesso
    exibirMensagemSucesso() {
        if (this.mensagemSucesso) {
            this.mensagemSucesso.style.display = 'block';

            setTimeout(() => {
                this.mensagemSucesso.style.display = 'none';
            }, 3000);
        }
    }

    // Salvar produtos no localStorage
    salvarProdutos() {
        localStorage.setItem('produtos', JSON.stringify(this.produtos));
    }

    // Carregar produtos do localStorage
    carregarProdutos() {
        const dados = localStorage.getItem('produtos');
        return dados ? JSON.parse(dados) : [];
    }

    // Obter todos os produtos
    obterTodosProdutos() {
        return this.produtos;
    }

    // Obter produto por ID
    obterProdutoPorID(id) {
        return this.produtos.find(p => p.id === id);
    }

    // Obter produto por código
    obterProdutoPorCodigo(codigo) {
        return this.produtos.find(p => p.codigo === codigo);
    }

    // Atualizar produto
    atualizarProduto(id, atualizacoes) {
        const indice = this.produtos.findIndex(p => p.id === id);

        if (indice !== -1) {
            this.produtos[indice] = { ...this.produtos[indice], ...atualizacoes };
            this.salvarProdutos();
            console.log('✓ Produto atualizado:', this.produtos[indice]);
            return true;
        }

        console.error('❌ Produto não encontrado');
        return false;
    }

    // Deletar produto
    deletarProduto(id) {
        const indice = this.produtos.findIndex(p => p.id === id);

        if (indice !== -1) {
            const produtoRemovido = this.produtos.splice(indice, 1);
            this.salvarProdutos();
            console.log('✓ Produto removido:', produtoRemovido[0]);
            return true;
        }

        console.error('❌ Produto não encontrado');
        return false;
    }

    // Deletar todos os produtos
    deletarTodos() {
        if (confirm('Tem certeza que deseja deletar TODOS os produtos? Esta ação não pode ser desfeita!')) {
            this.produtos = [];
            this.salvarProdutos();
            console.log('✓ Todos os produtos foram removidos');
            return true;
        }

        return false;
    }

    // Filtrar produtos por tipo
    filtrarPorTipo(tipo) {
        return this.produtos.filter(p => p.tipo.toLowerCase() === tipo.toLowerCase());
    }

    // Filtrar produtos por categoria
    filtrarPorCategoria(categoria) {
        return this.produtos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
    }

    // Calcular lucro total
    calcularLucroTotal() {
        if (this.produtos.length === 0) return 0;
        return this.produtos.reduce((total, p) => {
            return total + (p.precoUnitario - p.custo);
        }, 0);
    }

    // Obter relatório completo
    obterRelatorio() {
        if (this.produtos.length === 0) {
            return {
                totalProdutos: 0,
                precoMedioUnitario: '0.00',
                custoMedio: '0.00',
                lucroTotal: '0.00',
                margemMedia: '0%',
                produtos: []
            };
        }

        return {
            totalProdutos: this.produtos.length,
            precoMedioUnitario: (this.produtos.reduce((total, p) => total + p.precoUnitario, 0) / this.produtos.length).toFixed(2),
            custoMedio: (this.produtos.reduce((total, p) => total + p.custo, 0) / this.produtos.length).toFixed(2),
            lucroTotal: this.calcularLucroTotal().toFixed(2),
            margemMedia: this.calcularMargemMedia() + '%',
            produtos: this.produtos
        };
    }

    // Exibir produtos em tabela no console
    exibirTabela() {
        console.table(this.produtos);
    }

    // Exportar dados em JSON
    exportarJSON() {
        const dataStr = JSON.stringify(this.produtos, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `produtos_${new Date().toISOString().split('T')[0]}.json`;
        
    }
}

// ============================================
// INICIALIZAR AO CARREGAR A PÁGINA
// ============================================

let gerenciador;

document.addEventListener('DOMContentLoaded', () => {
    gerenciador = new GerenciadorProdutos();
});


// ========== PRODUTOS ==========
// Ver todos os produtos
gerenciador.obterTodosProdutos();

// Ver produtos em tabela
gerenciador.exibirTabela();

// Obter relatório
gerenciador.obterRelatorio();

// Filtrar por tipo
gerenciador.filtrarPorTipo('eletrônicos');

// Filtrar por categoria
gerenciador.filtrarPorCategoria('premium');

// Atualizar produto (trocar o 'id' pelo ID real)
gerenciador.atualizarProduto('id_aqui', { marca: 'Nova Marca' });

// Deletar produto (trocar o 'id' pelo ID real)
gerenciador.deletarProduto('id_aqui');

