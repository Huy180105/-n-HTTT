import { AiConsultationDto } from "@/data/dto";
import { AiConsultationResponse, AiMedicineSimilarityResponse, AiMedicineSuggestionResponse } from "@/data/interfaces";
import { SRO } from "@/data/sro";
import { aiApiGet, aiApiPost } from "@/services/api";

export const AiAPI = {
  async AiConsultation(dto: AiConsultationDto) {
    const payload = {
      ...dto,
      user_id: dto.userId || "guest_user",
      patient_age: dto.patientAge,
      patient_gender: dto.patientGender,
    };
    const res = await aiApiPost<typeof payload, SRO<AiConsultationResponse>>("v1/consultation/diagnose", payload)
    return res.data.data;
  },

  async AiMedicineSuggestion(consultationId: string) {
    const res = await aiApiGet<SRO<AiMedicineSuggestionResponse>>(`v1/consultation/recommend-medicines/${consultationId}`)
    return res.data.data;
  },

  async AiMedicineSimilarity(medicineId: string) {
    const res = await aiApiGet<SRO<AiMedicineSimilarityResponse>>(`v1/medicine/${medicineId}/simmilar-medicines`)
    return res.data.data;
  }
}