// lib/api.ts

// --- Tipos para Requisição ---

/** Opções de cabeçalho (Headers) para a requisição. */
type Headers = Record<string, string>;

/** Opções específicas para requisições com corpo (POST, PUT, PATCH). */
type BodyOptions = {
  /** O corpo da requisição (geralmente um objeto JSON). */
  body: Record<string, any>;
  /** Headers adicionais. */
  headers?: Headers;
};

/** Opções específicas para requisições sem corpo (GET, DELETE). */
type ParamOptions = {
  /** Parâmetros de query (URLSearchParams) para a requisição. Ex: { page: 1, sort: 'asc' }. */
  params?: Record<string, string | number | boolean>;
  /** Headers adicionais. */
  headers?: Headers;
};

/**
 * Função utilitária para converter um objeto de parâmetros em uma string de query.
 * @param params Objeto de parâmetros.
 * @returns A string de query, ex: '?page=1&sort=asc'.
 */
const toQueryString = (params: Record<string, string | number | boolean>): string => {
  const usp = new URLSearchParams();
  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key) && params[key] !== undefined) {
      // Converte boolean para string 'true'/'false' e números para string
      usp.append(key, String(params[key]));
    }
  }
  return usp.toString() ? `?${usp.toString()}` : '';
};


// --- Função de Requisição Central ---

/**
 * Função central que realiza a requisição fetch.
 * @param method O método HTTP (GET, POST, PUT, DELETE).
 * @param endpoint O caminho do endpoint, ex: '/product/123'.
 * @param options Opções para a requisição (headers, body, params).
 * @returns O resultado da resposta em JSON.
 */
async function request<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  endpoint: string,
  options: (BodyOptions | ParamOptions) = {}
): Promise<T> {
  
  // A variável de ambiente BASE_URL **deve** ser acessada diretamente
  // para garantir que seja 100% Server-Side. 
  // Em Next.js, use NEXT_PUBLIC_ se precisar de acesso no Client-Side, 
  // mas para Server-Side (como esta função) o prefixo não é estritamente necessário,
  // embora usar NEXT_PUBLIC_ para consistência em algumas configs de build seja comum.
  // Vamos presumir que BASE_URL está configurada.
  const BASE_URL = process.env.BASE_URL;

  if (!BASE_URL) {
    throw new Error("BASE_URL environment variable is not set.");
  }

  const defaultHeaders: Headers = {
    'Content-Type': 'application/json',
    // Adicione outros headers padrão aqui, como Authorization, se necessário
  };

  const isBodyRequest = method === 'POST' || method === 'PUT' || method === 'PATCH';

  let url = `${BASE_URL}${endpoint}`;
  let config: RequestInit = {
    method,
    headers: { ...defaultHeaders, ...options.headers },
  };

  // Tratamento de Parâmetros de Query (para GET/DELETE)
  if (!isBodyRequest && 'params' in options && options.params) {
    url += toQueryString(options.params);
  }

  // Tratamento do Corpo da Requisição (para POST/PUT/PATCH)
  if (isBodyRequest && 'body' in options && options.body) {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);
    
    // Trata respostas que não são 2xx
    if (!response.ok) {
      let errorBody: any = { message: `Request failed with status ${response.status}` };
      try {
        errorBody = await response.json(); // Tenta ler o JSON de erro
      } catch {
        // Ignora se não conseguir ler o JSON (pode ser um erro de texto ou vazio)
      }
      
      // Cria um erro mais detalhado
      const error = new Error(`HTTP Error ${response.status} for ${url}`);
      (error as any).status = response.status;
      (error as any).body = errorBody;
      throw error;
    }

    // Se a resposta for 204 No Content, retorna um objeto vazio ou null
    if (response.status === 204) {
      return null as T;
    }

    // Retorna o JSON da resposta
    return await response.json() as T;

  } catch (error) {
    // Loga ou trata o erro. Em Server-Side, você pode fazer um log mais robusto.
    console.error(`API Request Error [${method} ${url}]:`, error);
    throw error; // Propaga o erro para o ponto de chamada
  }
}


// --- Funções de Atalho (O Abstrato que você solicitou) ---

/**
 * Realiza uma requisição GET.
 * @param endpoint O caminho do endpoint.
 * @param options Opções (incluindo `params`).
 */
const GET = <T>(endpoint: string, options: ParamOptions = {}) => 
  request<T>('GET', endpoint, options);

/**
 * Realiza uma requisição POST.
 * @param endpoint O caminho do endpoint.
 * @param options Opções (incluindo `body`).
 */
const POST = <T>(endpoint: string, options: BodyOptions) => 
  request<T>('POST', endpoint, options);

/**
 * Realiza uma requisição PUT.
 * @param endpoint O caminho do endpoint.
 * @param options Opções (incluindo `body`).
 */
const PUT = <T>(endpoint: string, options: BodyOptions) => 
  request<T>('PUT', endpoint, options);

/**
 * Realiza uma requisição DELETE.
 * @param endpoint O caminho do endpoint.
 * @param options Opções (incluindo `params`).
 */
const DELETE = <T>(endpoint: string, options: ParamOptions = {}) => 
  request<T>('DELETE', endpoint, options);

/**
 * Objeto API que expõe os métodos HTTP.
 */
export const api = {
  GET,
  POST,
  PUT,
  DELETE,
  // Você pode adicionar PATCH e outros métodos aqui
};