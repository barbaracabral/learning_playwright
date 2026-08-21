export type Administrador = boolean | 'true' | 'false';

export interface Usuario {
  _id?: string;
  nome: string;
  email: string;
  password?: string;
  administrador: Administrador;
}

export interface Produto {
  _id?: string;
  nome: string;
  preco: number;
  descricao: string;
  quantidade: number;
  imagem?: string;
}

export interface ItemCarrinho {
  _id?: string;
  idProduto: string;
  quantidade: number;
}

export interface Carrinho {
  _id?: string;
  produtos: ItemCarrinho[];
  precoTotal?: number;
  quantidadeTotal?: number;
  idUsuario?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  authorization: string;
}

export interface MessageResponse {
  message: string;
  _id?: string;
}

export interface UsuariosListResponse {
  quantidade: number;
  usuarios: Usuario[];
}

export interface UsuarioResponse {
  usuario: Usuario;
}

export interface ProdutosListResponse {
  quantidade: number;
  produtos: Produto[];
}

export interface ProdutoResponse {
  produto: Produto;
}

export interface CarrinhosListResponse {
  quantidade: number;
  carrinhos: Carrinho[];
}

export interface CarrinhoResponse {
  carrinho: Carrinho;
}

export interface ApiErrorResponse {
  message: string;
}
