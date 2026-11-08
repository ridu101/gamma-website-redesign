import api from "./api";

export const submitQuoteRequest = async (formData) => {
    try {
        const response = await api.post("/inquiries/quote", {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company || null,
            service: formData.service,
            budget: formData.budget || null,
            timeline: formData.timeline || null,
            message: formData.message,
            productName: formData.productName || null,
            productType: formData.productType || null,
        });

        return {
            ...response.data,
            demo: false,
        };
    } catch (error) {
        const validationErrors = error.response?.data?.errors;

        if (validationErrors) {
            const firstError = Object.values(validationErrors)[0]?.[0];

            throw new Error(
                firstError || "Please check your submitted information."
            );
        }

        throw new Error(
            error.response?.data?.message ||
            "Unable to submit your quote request. Please try again."
        );
    }
};
