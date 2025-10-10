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
    // Loga ou trata o erro. Em Server-Side, você pode fazer um log m
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