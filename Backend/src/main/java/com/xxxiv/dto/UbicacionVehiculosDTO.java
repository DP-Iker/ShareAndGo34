package com.xxxiv.dto;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UbicacionVehiculosDTO {
	@NotNull
	@Schema(description = "ID del vehículo", example = "2")
	private int id;
	
	@NotNull
	@Schema(description = "Latitud dónde se encuentra el vehículo", example = "41.148796323160845")
    private double latitud;
	
	@NotNull
	@Schema(description = "Longitud dónde se encuentra el vehículo", example = "1.1001598072454213")
    private double longitud;
	@NotNull
	
	@Schema(description = "Localidad en la que se encuentra el vehículo", example = "Reus")
    private String localidad;
}
