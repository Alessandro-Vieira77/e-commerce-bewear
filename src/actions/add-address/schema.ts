import { z } from "zod";

export const addAddressSchema = z.object({
  recipientName: z.string().min(1, "Nome é obrigatório"),
  street: z.string().min(1, "Rua é obrigatório"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(2, "Estado é obrigatório"),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  zipCode: z.string().min(8, "CEP inválido"),
  country: z.string().min(1, "País é obrigatório").default("Brasil"),
  phone: z.string().min(1, "Telefone é obrigatório"),
  email: z.string().email("E-mail inválido"),
  cpfOrCnpj: z.string().min(1, "CPF/CNPJ é obrigatório"),
});

export type AddAddressInput = z.infer<typeof addAddressSchema>;
