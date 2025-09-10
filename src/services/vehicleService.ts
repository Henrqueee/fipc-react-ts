interface VehicleData {
  vehicleType: string;
  brand: string;
  model: string;
  year: string;
  fuel?: string;
}

interface VehicleResult {
  id: string;
  brand: string;
  model: string;
  year: string;
  fuel: string;
  price: number;
  fipeCode: string;
  referenceMonth: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class VehicleService {
  private readonly baseUrl = 'https://parallelum.com.br/fipe/api/v1';

  private async makeRequest<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async getBrands(vehicleType: string): Promise<ApiResponse<Array<{ codigo: string; nome: string }>>> {
    const typeMap: Record<string, string> = {
      cars: 'carros',
      motorcycles: 'motos',
      trucks: 'caminhoes'
    };
    
    const apiType = typeMap[vehicleType] || 'carros';
    return this.makeRequest(`${this.baseUrl}/${apiType}/marcas`);
  }

  async getModels(
    vehicleType: string, 
    brandCode: string
  ): Promise<ApiResponse<{ modelos: Array<{ codigo: string; nome: string }> }>> {
    const typeMap: Record<string, string> = {
      cars: 'carros',
      motorcycles: 'motos',
      trucks: 'caminhoes'
    };
    
    const apiType = typeMap[vehicleType] || 'carros';
    return this.makeRequest(`${this.baseUrl}/${apiType}/marcas/${brandCode}/modelos`);
  }

  async getYears(
    vehicleType: string, 
    brandCode: string, 
    modelCode: string
  ): Promise<ApiResponse<Array<{ codigo: string; nome: string }>>> {
    const typeMap: Record<string, string> = {
      cars: 'carros',
      motorcycles: 'motos',
      trucks: 'caminhoes'
    };
    
    const apiType = typeMap[vehicleType] || 'carros';
    return this.makeRequest(`${this.baseUrl}/${apiType}/marcas/${brandCode}/modelos/${modelCode}/anos`);
  }

  async getVehicleValue(
    vehicleType: string,
    brandCode: string,
    modelCode: string,
    yearCode: string
  ): Promise<ApiResponse<VehicleResult>> {
    const typeMap: Record<string, string> = {
      cars: 'carros',
      motorcycles: 'motos',
      trucks: 'caminhoes'
    };
    
    const apiType = typeMap[vehicleType] || 'carros';
    const url = `${this.baseUrl}/${apiType}/marcas/${brandCode}/modelos/${modelCode}/anos/${yearCode}`;
    
    const response = await this.makeRequest<any>(url);
    
    if (response.success && response.data) {
      const apiData = response.data;
      const result: VehicleResult = {
        id: `${brandCode}-${modelCode}-${yearCode}`,
        brand: apiData.Marca || '',
        model: apiData.Modelo || '',
        year: apiData.AnoModelo?.toString() || '',
        fuel: apiData.Combustivel || '',
        price: parseFloat(apiData.Valor?.replace(/[R$\s.,]/g, '').replace(',', '.')) || 0,
        fipeCode: apiData.CodigoFipe || '',
        referenceMonth: apiData.MesReferencia || ''
      };
      
      return { success: true, data: result };
    }
    
    return response as ApiResponse<VehicleResult>;
  }

  async searchVehicle(vehicleData: VehicleData): Promise<ApiResponse<VehicleResult>> {
    // For demo purposes, return mock data
    // In a real implementation, you would use the actual API calls above
    const mockResult: VehicleResult = {
      id: `${vehicleData.brand}-${vehicleData.model}-${vehicleData.year}`,
      brand: vehicleData.brand,
      model: vehicleData.model,
      year: vehicleData.year,
      fuel: vehicleData.fuel || 'Gasoline',
      price: Math.floor(Math.random() * 100000) + 20000,
      fipeCode: `${Math.floor(Math.random() * 900000) + 100000}`,
      referenceMonth: new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: true, data: mockResult };
  }
}

export const vehicleService = new VehicleService();
export default vehicleService;
export type { VehicleData, VehicleResult, ApiResponse };