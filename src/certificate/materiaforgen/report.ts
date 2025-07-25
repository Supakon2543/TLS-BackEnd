import { CertTemplateA, CertTemplateB, CertTemplateC, CertTemplateD, CertTemplateE } from "./model"
import { convertImageToBase64 } from "./convertImageToBase64";

export const getReportDataA = async () => {
    const signatureBase64 = await convertImageToBase64('/images/Signature.png');
    const isAccredited = false;
    const data: CertTemplateA = {
        file_name: "Test Report Name Batch 12345 (Rev.00)",
        is_accredited: isAccredited,
        // สมนุดิข้อมูลที่ใช้แสดงในรายงานมาจากการเรียกด้วยตาราง request_sample By request_sample.id
        header: {
            report_heading: "Certificate of Analysis",  // request_sample -> request_detail -> report_heading (name)
            sample_name: "C-VITT LEMON VC1000 SR V3 140ML 1X3X10", // request_sample (sample_name)
            sample_detail: "MFG AH 070525.02 BB070526", // request_sample (Batch No)
            sample_description: "Dietary supplement", // request_sample -> sample_description (name)
            sample_condition: "Samples are contained in a glass bottle", // request_sample -> request_sample_item -> sample_condition (name)
            analysis_date: "07/05/2025", // Datenow().tostring()
            customer_contact: "Refer as Lab Services Agreement (S-AY-Q-QCD-0115 Rev.02)", //request_sample -> request (requester_id)
            sample_code: "FGB2509663", // request_sample (sample_code)
            received_date: "07/05/2025", //request_sample -> request_detail (received_date)
            report_date: "09/05/2025", // request_sample -> request_log (timestamp) โดย activity_request_id = "RELEASE"
            report_no: "FGB2509663", // request_sample (sample_code)
            reg_no: "14-2-00441-5-0003" // request_sample -> material (reg_no)
        },
        table_source: [ // query by list form chemical_parameter and microbiological_parameter by request_sample -> material_chemical -> chemical_parameter and request_sample -> material_microbiological -> microbiological_parameter and
        //  request_sample -> material_chemical -> chemical_parameter 
            {
                test_items: "Chemical Test", // microbiological_parameter or chemical_parameter (name)
                lod: "", // microbiological_parameter or chemical_parameter -> chemical_sample_description or microbiology_sample_description (lod_value)
                loq: "", // microbiological_parameter or chemical_parameter -> chemical_sample_description or microbiology_sample_description (loq_value)
                results: "", // microbiological_parameter or chemical_parameter (final_result) != null make data "Passed" else make data "Not Passed" แต่หาก microbiological_parameter or chemical_parameter (decimal) have data get (decimal) instead of "Passed" or "Not Passed"
                specification: "", // microbiological_parameter or chemical_parameter (spec)
                unit: "", // microbiological_parameter or chemical_parameter -> unit (name)
                method: "", // microbiological_parameter or chemical_parameter ()
                is_header: true,
                is_special: false
            },
            {
                test_items: "Appearance",
                lod: "-",
                loq: "-",
                results: "Passed",
                specification: "Yellow color and clear solution",
                unit: "-",
                method: "Visual test",
                is_header: false,
                is_special: false
            },
            {
                test_items: "Odour/Taste",
                lod: "-",
                loq: "-",
                results: "Passed",
                specification: "Mixed Fruit, Sweet and sour",
                unit: "-",
                method: "Sensory test",
                is_header: false,
                is_special: false
            },
            {
                test_items: " pH (25±0.5°C)",
                lod: "-",
                loq: "-",
                results: "3.52",
                specification: "3.30 - 3.70",
                unit: "CFU/ml",
                method: "In-house method W-AY-Q-QCC-027 based on AOAC (2019) 981.12",
                is_header: false,
                is_special: false
            },
            {
                test_items: " Total soluble solid (25±0.5°C)",
                lod: "-",
                loq: "-",
                results: "8.88",
                specification: "8.60 - 9.30",
                unit: "CFU/ml",
                method: "In-house method W-AY-Q-QCC-009 based on AOAC (2019) 932.14",
                is_header: false,
                is_special: false
            },
            {
                test_items: "Microbiology Test",
                lod: "",
                loq: "",
                results: "",
                specification: "",
                unit: "",
                method: "",
                is_header: true,
                is_special: false
            },
            {
                test_items: "Aerobic Plate Count",
                lod: "-",
                loq: "-",
                results: "<1",
                specification: "<100",
                unit: "CFU/ml",
                method: "FDA BAM Online, 2001 (Chapter 3)",
                is_header: false,
                is_special: false
            },
            {
                test_items: "Yeast & Mold",
                lod: "-",
                loq: "-",
                results: "<1",
                specification: "<1",
                unit: "CFU/ml",
                method: "AOAC (2023) , 2014.05",
                is_header: false,
                is_special: false
            }
        ],
        decision: "",
        remark: [],
        approver: {
            name: "Tananat Khorubklang",
            position: "Quality Control Chemical, Physical and FG Lead",
            signature: signatureBase64
        },
        footer: {
            form_id: "F-AY-Q-QCC-030", //always same data "F-AY-Q-QCC-030"
            revision: "04", //always same data "04"
            effective_date: "11 Dec 2024", //always same data "11 Dec 2024"
            address: "48/2 Moo.7 Asian Highway Road, Khlong Suan Plu, Phra Nakorn Si Ayutthaya 13000 THAILAND (Tel : 02-351-1123)" //if lab site  Lab Site = AY show 48/2 Moo.7 Asian Highway Road, Khlong Suan Plu, Phra Nakorn Si Ayu haya 13000 Thailand if Lab Site = HM show 348 Ramkhamhaeng Road, Huamak, Bangkapi, Bangkok 10240 Thailand
        }
    }

    return data;
}

export const getReportDataB = async () => {
    const signatureBase64 = await convertImageToBase64('/images/Signature.png');
    const isAccredited = false;
    const data: CertTemplateB = {
        file_name: "Test Report Name Batch 12345 10:00 (Rev.00)",
        is_accredited: isAccredited,
        header: {
            report_heading: "Certificate of Analysis", // request_sample -> request_detail -> report_heading (name)
            product_name: "M-150 150 ML.INDONESIA (NEWTON 2)", // request_sample (sample_name)
            lot_no: "040125 AG", // request_sample (batch_no)
            mfg_date: "04/01/2025", // request_sample (sampling_date)
            best_before: "01/2027", // request_sample (expiry_date)
            analytical_date: "05/01/2025", 
            no: "FGB2500112", // request_sample (sample_code)
            received_date: "05/01/2025",  //request_sample -> request_detail (received_date)
            report_date: "13/01/2025", // request_sample -> request_log (timestamp) โดย activity_request_id = "RELEASE"
            report_no: "FGB2500112", // request_sample (sample_code)
            reg_no: "14-2-00441-5-0003" // request_sample -> material (reg_no)
        },
        table_source: [
            {
                test_items: "Physical/Chemical Test", // microbiological_parameter or chemical_parameter (name)
                lod: "", // microbiological_parameter or chemical_parameter -> chemical_sample_description or microbiology_sample_description (lod_value)
                loq: "", // microbiological_parameter or chemical_parameter -> chemical_sample_description or microbiology_sample_description (loq_value)
                results: "", // microbiological_parameter or chemical_parameter (final_result) != null make data "Passed" else make data "Not Passed" แต่หาก microbiological_parameter or chemical_parameter (decimal) have data get (decimal) instead of "Passed" or "Not Passed"
                specification: "", // microbiological_parameter or chemical_parameter (spec)
                unit: "", // microbiological_parameter or chemical_parameter -> unit (name)
                method: "", // microbiological_parameter or chemical_parameter (method)
                is_header: true,
                is_special: false,
            },
            {
                test_items: "Appearance",
                lod: "-",
                loq: "-",
                results: "Passed",
                specification: "Yellow and clear solution",
                unit: "-",
                method: "Visual test",
                is_header: false,
                is_special: false
            },
            {
                test_items: "Odour/Taste",
                lod: "-",
                loq: "-",
                results: "Passed",
                specification: "Mixed fruit, Sweet and sour",
                unit: "-",
                method: "Sensory test",
                is_header: false,
                is_special: false
            },
            {
                test_items: "pH (25±0.5°C)",
                lod: "-",
                loq: "-",
                results: "3.45",
                specification: "3.30 - 3.70",
                unit: "-",
                method: "In-house method W-AY-Q-QCC-027 based on AOAC (2019) 981.12",
                is_header: false,
                is_special: false
            },
            {
                test_items: "Total soluble solid (25±0.5°C)",
                lod: "-",
                loq: "-",
                results: "18.38",
                specification: "18.00 - 19.30",
                unit: "%",
                method: "In-house method W-AY-Q-QCC-009 based on AOAC (2019) 981.12",
                is_header: false,
                is_special: false
            },
            {
                test_items: "Niacinamide",
                lod: "-",
                loq: "-",
                results: "20.12",
                specification: "16.00 - 24.00",
                unit: "mg/150ml",
                method: "In-house method W-AY-Q-QCC-016 based on Food Chemistry 82 (2003), Page 315-327",
                is_header: false,
                is_special: false
            },
            {
                test_items: "Pyridoxine HCL",
                lod: "-",
                loq: "-",
                results: "5.05",
                specification: "4.00 - 6.00",
                unit: "mg/150ml",
                method: "In-house methodW-AY-Q-QCC-016 based on Food Chemistry 82 (2003), Paqge 315-327",
                is_header: false,
                is_special: false
            },
            {
                test_items: "Caffeine",
                lod: "-",
                loq: "-",
                results: "47.19",
                specification: "45.00 - 50.00",
                unit: "mg/150ml",
                method: " In-house methodW-AY-Q-QCC-016 based on Food Chemistry 82 (2003), Page 315-327",
                is_header: false,
                is_special: false
            },
            {
                test_items: "Benzoic Acid",
                lod: "-",
                loq: "-",
                results: "153.02",
                specification: "Not exceed 2,000.00",
                unit: "mg/kg",
                method: " In-house methodW-AY-Q-QCC-016 based on Food Chemistry 82 (2003), Page 315-327",
                is_header: false,
                is_special: false
            },
            {
                test_items: "*Heavy metal (Arsenic, -Cadmium, Lead, Mercury)",
                lod: "-",
                loq: "-",
                results: "-",
                specification: "-",
                unit: "-",
                method: "-",
                is_header: false,
                is_special: true
            },
            {
                test_items: "Microbiology Test",
                lod: "",
                loq: "",
                results: "",
                specification: "",
                unit: "",
                method: "",
                is_header: true,
                is_special: false
            },
            {
                test_items: "Aerobic Plate Count",
                lod: "-",
                loq: "-",
                results: "<1",
                specification: "≤2x10²",
                unit: "CFU/ml",
                method: "FDA BAM Online, 2001 (Chapter 3)",
                is_header: false,
                is_special: false
            },
            {
                test_items: "Escherichia coli",
                lod: "-",
                loq: "-",
                results: "Negative",
                specification: "Negative",
                unit: "CFU/g",
                method: "FDA BAM Online, 2020 (Chapter 4)",
                is_header: false,
                is_special: false
            },
            {
                test_items: "Yeast & Mold",
                lod: "-",
                loq: "-",
                results: "<1",
                specification: "≤2x10",
                unit: "CFU/ml",
                method: "AOAC(2019), 997.02",
                is_header: false,
                is_special: false
            },
            {
                test_items: "Escherichia coli",
                lod: "-",
                loq: "-",
                results: "Negative",
                specification: "Negative",
                unit: "CFU/g",
                method: "FDA BAM Online, 2020 (Chapter 4)",
                is_header: false,
                is_special: false
            },
            {
                test_items: "Yeast & Mold",
                lod: "-",
                loq: "-",
                results: "<1",
                specification: "≤2x10",
                unit: "CFU/ml",
                method: "AOAC(2019), 997.02",
                is_header: false,
                is_special: false
            },
                        {
                test_items: "Yeast & Mold",
                lod: "-",
                loq: "-",
                results: "<1",
                specification: "≤2x10",
                unit: "CFU/ml",
                method: "AOAC(2019), 997.02",
                is_header: false,
                is_special: false
            },
                                    {
                test_items: "Yeast & Mold",
                lod: "-",
                loq: "-",
                results: "<1",
                specification: "≤2x10",
                unit: "CFU/ml",
                method: "AOAC(2019), 997.02",
                is_header: false,
                is_special: false
            },
                                    {
                test_items: "Yeast & Mold",
                lod: "-",
                loq: "-",
                results: "<1",
                specification: "≤2x10",
                unit: "CFU/ml",
                method: "AOAC(2019), 997.02",
                is_header: false,
                is_special: false
            },
        ],
        conclusion: "Passed",
        remark: [
            {
                text: "Microbiological testing items refer Type of Preparation A (Aqueous Preparation)"
            },
            {
                text: "*Arsenic, Cadmium, Lead and Mercury are referred to external accredited laboratory test report no."
            }
        ],
        approver: {
            name: "Supaporn Rotsakan",
            position: "QC Microbiological Lead",
            signature: signatureBase64
        },
        footer: {
            form_id: "F-HM-Q-QCC-015",
            revision: "04",
            effective_date: "18 Dec 2024",
            address: "348 Ramkhamhaeng Road, Huamak, Bangkapi, Bangkok 10240 Thailand"
        }
    }

    return data;
}

export const getReportDataC = async () => {
    const signatureBase64 = await convertImageToBase64('/images/Signature.png');
    const isAccredited = true;
    const data: CertTemplateC = {
        file_name: "Test Report Name Batch 12345 (Rev.00)",
        is_accredited: isAccredited,
        header: {
            report_heading: "Test Report",   // request_sample -> request_detail -> report_heading (name)
            sample_name: "C-VITT LEMON VC1000 SR V3 140ML 1X3X10", // request_sample (sample_name)
            sample_detail: "MFG AH 070525.02 BB070526",  // request_sample (Batch No)
            sample_description: "Dietary supplement", // request_sample -> sample_description (name)
            sample_condition: "Samples are contained in a glass bottle", // request_sample -> request_sample_item -> sample_condition (name)
            analysis_date: "07/05/2025", // Datenow().tostring()
            customer_contact: "Refer as Lab Services Agreement (S-AY-Q-QCD-0115 Rev.02)", 
            sample_code: "FGB2509663",
            received_date: "07/05/2025",
            report_date: "09/05/2025",
            report_no: "FGB2509663",
            reg_no: "14-2-00441-5-0003"
        },
        table_source: [
            {
                test_items: "Chemical Test",
                lod: "",
                loq: "",
                results: "",
                specification: "",
                unit: "",
                method: "",
                is_header: true,
                is_special: false
            },
            {
                test_items: "* Appearance",
                lod: "-",
                loq: "-",
                results: "Passed",
                specification: "Light yellow, no visible foreign matters, Lemon, Sweet and sour",
                unit: "-",
                method: "Visual test",
                is_header: false,
                is_special: false
            },
            {
                test_items: "pH (25°C)",
                lod: "-",
                loq: "2.84",
                results: "3.53",
                specification: "3.20 - 3.80",
                unit: "-",
                method: "In-house method W-AY-Q-QCC-027 based on AOAC (2023) 981.12",
                is_header: false,
                is_special: false
            },
            {
                test_items: "Total soluble solid (25°C)",
                lod: "-",
                loq: "1.08",
                results: "6.84",
                specification: "6.50 - 7.10",
                unit: "%",
                method: "In-house method W-AY-Q-QCC-009 based on AOAC (2023) 932.14",
                is_header: false,
                is_special: false
            },
            {
                test_items: "* Volume",
                lod: "-",
                loq: "-",
                results: "142",
                specification: "Individually not less than 140",
                unit: "ml",
                method: "Measuring cylinder",
                is_header: false,
                is_special: false
            },
            {
                test_items: "Acidity (as Citric acid)",
                lod: "0.006",
                loq: "0.06",
                results: "0.742",
                specification: "0.680 - 0.750",
                unit: "%w/v",
                method: "In-house method W-AY-Q-QCC-016 based on Food Chemistry 82 (2003), Page 315-327",
                is_header: false,
                is_special: false
            },
            {
                test_items: "* L-Ascorbic Acid",
                lod: "-",
                loq: "-",
                results: "1234",
                specification: "1200 - 1280",
                unit: "mg/100ml",
                method: "In-house method W-AY-Q-QCC-036 based on AOAC (2023) 967.21",
                is_header: false,
                is_special: false
            },
            {
                test_items: "Microbiology Test",
                lod: "",
                loq: "",
                results: "",
                specification: "",
                unit: "",
                method: "",
                is_header: true,
                is_special: false
            },
            {
                test_items: "Aerobic Plate Count",
                lod: "-",
                loq: "-",
                results: "<1",
                specification: "0",
                unit: "CFU/ml",
                method: "FDA BAM Online, 2001 (Chapter 3)",
                is_header: false,
                is_special: false
            },
            {
                test_items: "Yeast & Mold",
                lod: "-",
                loq: "-",
                results: "<1",
                specification: "0",
                unit: "CFU/ml",
                method: "AOAC (2023) , 2014.05",
                is_header: false,
                is_special: false
            },
            {
                test_items: "Coliforms",
                lod: "-",
                loq: "-",
                results: "<1.1",
                specification: "<2.2",
                unit: "MPN/100ml",
                method: "FDA BAM Online, 2020 (Chapter 4)",
                is_header: false,
                is_special: false
            },
            {
                test_items: "Escherichia coli",
                lod: "-",
                loq: "-",
                results: "<1.1",
                specification: "Not detected",
                unit: "MPN/100ml",
                method: "FDA BAM Online, 2020 (Chapter 4)",
                is_header: false,
                is_special: false
            }
        ],
        decision: "Passed",
        remark: [
            {
                text: "<1 CFU/ml  : Microorganism was not found in 1 ml. sample volume at the lowest dilution level."
            },
            {
                text: "<1.1 MPN/100 ml : Bacteria was not found in 100 ml. sample volume at the lowest dilution level."
            }
        ],
        approver: {
            name: "Tananat Khorubklang",
            position: "Quality Control Chemical, Physical and FG Lead",
            signature: signatureBase64
        },
        footer: {
            form_id: "F-AY-Q-QCC-030",
            revision: "04",
            effective_date: "11 Dec 2024",
            address: "48/2 Moo.7 Asian Highway Road, Khlong Suan Plu, Phra Nakorn Si Ayutthaya 13000 THAILAND (Tel : 02-351-1123)"
        }
    }

    return data;
}

export const getReportDataD = async () => {
    const signatureBase64 = await convertImageToBase64('/images/Signature.png');
    const data: CertTemplateD = {
        file_name: "RQ2501041-Chemical (Rev.00)",
        header: {
            received_by: "Mayuree.Usp@osotspa.com, Ratchadaporn.Hom@osotspa.com, Supaporn.Sae@osotspa.com, Kittiwara.Chi@osotspa.com, Watcharin.Wan@osotspa.com",
            request_no: "RQ2501041",
            received_date: "13/01/2025",
            report_date: "15/01/2025"
        },
        table_source: [
            {
                sample_name: "M-150 HI Vit B12 AI32250001",
                sample_code: "Q25010959",
                sampling_date: "12/01/25",
                time: "23.39",
                line: "23.39",
                parameter: [
                    {
                        parameter: "Color & appearance",
                        results: "Passed",
                        unit: "-",
                        method: " Difference from control Method evaluated by T-test"
                    },
                    {
                        parameter: "Odor",
                        results: "Passed",
                        unit: "-",
                        method: " Difference from control Method evaluated by T-test"
                    },
                                        {
                        parameter: "Taste",
                        results: "Passed",
                        unit: "-",
                        method: "Difference from control Method evaluated by T-test"
                    },
                                        {
                        parameter: "Aftertaste",
                        results: "Passed",
                        unit: "-",
                        method: "Difference from control Method evaluated by T-test"
                    },
                                        {
                        parameter: "Brix @25 °C",
                        results: "7.79",
                        unit: "%",
                        method: "In-house method W-AY-Q-QCC-009 based on AOAC (2019) 932.14"
                    },
                    {
                        parameter: "pH",
                        results: "3.57",
                        unit: "-",
                        method: "In-house method W-AY-Q-QCC-027 based on AOAC (2019) 981.12"
                    }
                ]
            },
            {
                sample_name: "M-150 HI Vit B12 AI32250002",
                sample_code: "Q25010959",
                sampling_date: "12/01/25",
                time: "23.39",
                line: "23.39",
                parameter: [
                    {
                        parameter: "Color & appearance",
                        results: "Passed",
                        unit: "-",
                        method: " Difference from control Method evaluated by T-test"
                    },
                    {
                        parameter: "Odor",
                        results: "Passed",
                        unit: "-",
                        method: " Difference from control Method evaluated by T-test"
                    },
                                        {
                        parameter: "Taste",
                        results: "Passed",
                        unit: "-",
                        method: "Difference from control Method evaluated by T-test"
                    },
                                        {
                        parameter: "Aftertaste",
                        results: "Passed",
                        unit: "-",
                        method: "Difference from control Method evaluated by T-test"
                    },
                                        {
                        parameter: "Brix @25 °C",
                        results: "7.79",
                        unit: "%",
                        method: "In-house method W-AY-Q-QCC-009 based on AOAC (2019) 932.14"
                    },
                    {
                        parameter: "pH",
                        results: "3.57",
                        unit: "-",
                        method: "In-house method W-AY-Q-QCC-027 based on AOAC (2019) 981.12"
                    }
                ]
            },
            {
                sample_name: "M-150 HI Vit B12 AI32250003",
                sample_code: "Q25010959",
                sampling_date: "12/01/25",
                time: "23.39",
                line: "23.39",
                parameter: [
                    {
                        parameter: "Color & appearance",
                        results: "Passed",
                        unit: "-",
                        method: " Difference from control Method evaluated by T-test"
                    },
                    {
                        parameter: "Odor",
                        results: "Passed",
                        unit: "-",
                        method: " Difference from control Method evaluated by T-test"
                    },
                    {
                        parameter: "Taste",
                        results: "Passed",
                        unit: "-",
                        method: "Difference from control Method evaluated by T-test"
                    },
                    {
                        parameter: "Aftertaste",
                        results: "Passed",
                        unit: "-",
                        method: "Difference from control Method evaluated by T-test"
                    },
                    {
                        parameter: "Brix @25 °C",
                        results: "7.79",
                        unit: "%",
                        method: "In-house method W-AY-Q-QCC-009 based on AOAC (2019) 932.14"
                    },
                    {
                        parameter: "pH",
                        results: "3.57",
                        unit: "-",
                        method: "In-house method W-AY-Q-QCC-027 based on AOAC (2019) 981.12"
                    },
                    {
                        parameter: "Aftertaste",
                        results: "Passed",
                        unit: "-",
                        method: "Difference from control Method evaluated by T-test"
                    },
                    {
                        parameter: "Brix @25 °C",
                        results: "7.79",
                        unit: "%",
                        method: "In-house method W-AY-Q-QCC-009 based on AOAC (2019) 932.14"
                    },
                    {
                        parameter: "pH",
                        results: "3.57",
                        unit: "-",
                        method: "In-house method W-AY-Q-QCC-027 based on AOAC (2019) 981.12"
                    },
                    {
                        parameter: "Taste",
                        results: "Passed",
                        unit: "-",
                        method: "Difference from control Method evaluated by T-test"
                    },
                    {
                        parameter: "Aftertaste",
                        results: "Passed",
                        unit: "-",
                        method: "Difference from control Method evaluated by T-test"
                    },
                                        {
                        parameter: "pH",
                        results: "3.57",
                        unit: "-",
                        method: "In-house method W-AY-Q-QCC-027 based on AOAC (2019) 981.12"
                    },
                    {
                        parameter: "Taste",
                        results: "Passed",
                        unit: "-",
                        method: "Difference from control Method evaluated by T-test"
                    },
                    {
                        parameter: "Aftertaste",
                        results: "Passed",
                        unit: "-",
                        method: "Difference from control Method evaluated by T-test"
                    },
                ]
            },
            {
                sample_name: "M-150 HI Vit B12 AI32250004",
                sample_code: "Q25010959",
                sampling_date: "12/01/25",
                time: "23.39",
                line: "23.39",
                parameter: [
                    {
                        parameter: "Color & appearance",
                        results: "Passed",
                        unit: "-",
                        method: " Difference from control Method evaluated by T-test"
                    },
                    {
                        parameter: "Odor",
                        results: "Passed",
                        unit: "-",
                        method: " Difference from control Method evaluated by T-test"
                    },
                                        {
                        parameter: "Taste",
                        results: "Passed",
                        unit: "-",
                        method: "Difference from control Method evaluated by T-test"
                    },
                                        {
                        parameter: "Aftertaste",
                        results: "Passed",
                        unit: "-",
                        method: "Difference from control Method evaluated by T-test"
                    },
                                        {
                        parameter: "Brix @25 °C",
                        results: "7.79",
                        unit: "%",
                        method: "In-house method W-AY-Q-QCC-009 based on AOAC (2019) 932.14"
                    },
                    {
                        parameter: "pH",
                        results: "3.57",
                        unit: "-",
                        method: "In-house method W-AY-Q-QCC-027 based on AOAC (2019) 981.12"
                    }
                ]
            }
        ],
        remark: [
            // {
            //     text: "<1 CFU/ml  : Microorganism was not found in 1 ml. sample volume at the lowest dilution level."
            // },
            // {
            //     text: "<1.1 MPN/100 ml : Bacteria was not found in 100 ml. sample volume at the lowest dilution level."
            // }
        ],
        approver: {
            name: "Tananat Khorubklang",
            position: "Quality Control Chemical & Physical & FG Lead",
            signature: signatureBase64
        },
        footer: {
            form_id: "F-AY-Q-QCC-008",
            revision: "00",
            effective_date: "01 Mar 2022",
            address: "48/2 Moo 7, Klong Suan Plu, Phra Nakhon Si Ayutthaya, Ayutthaya 13000"
        }
    }

    return data;
}

export const getReportDataE = async () => {
    const signatureBase64 = await convertImageToBase64('/images/Signature.png');
    const data: CertTemplateE = {
        file_name: "RQ2501041-Microbiological (Rev.00)",
        header: {
            request_no: "RQ2505006",
            request_by: "Watcharin",
            received_date: "05/05/2025",
            received_by: "Mayuree.Usp@osotspa.com, Ratchadaporn.Hom@osotspa.com, Supaporn.Sae@osotspa.com, Kittiwara.Chi@osotspa.com, Watcharin.Wan@osotspa.com",
            analysis_date: "05/05/2025",
            report_date: "13/05/2025"
        },
        parameter: [
            {
                no: 1,
                param: [
                    {
                        id: 1,
                        parameter: "APC",
                        unit: "cfu/swab",
                        method: "Compendium of Methods for the Microbiological Examination of Foods Fifth Edition Chapter 3 Microbiological Monitoring of the Food Processing Environment"
                    },
                    {
                        id: 2,
                        parameter: "Coliforms",
                        unit: "cfu/swab",
                        method: "Compendium of Methods for the Microbiological Examination of Foods Fifth Edition Chapter 3 Microbiological Monitoring of the Food Processing Environment"
                    },
                    {
                        id: 3,
                        parameter: "E.coli",
                        unit: "cfu/swab",
                        method: "Compendium of Methods for the Microbiological Examination of Foods Fifth Edition Chapter 3 Microbiological Monitoring of the Food Processing Environment"
                    },
                    {
                        id: 4,
                        parameter: "Yeast",
                        unit: "cfu/swab",
                        method: "Compendium of Methods for the Microbiological Examination of Foods Fifth Edition Chapter 3 Microbiological Monitoring of the Food Processing Environment"
                    },
                    {
                        id: 5,
                        parameter: "Mold",
                        unit: "cfu/swab",
                        method: "Compendium of Methods for the Microbiological Examination of Foods Fifth Edition Chapter 3 Microbiological Monitoring of the Food Processing Environment"
                    },
                    {
                        id: 6,
                        parameter: "S.aureus",
                        unit: "cfu/swab",
                        method: "Compendium of Methods for the Microbiological Examination of Foods Fifth Edition Chapter 3 Microbiological Monitoring of the Food Processing Environment"
                    },
                    {
                        id: 7,
                        parameter: "Sallmonella.spp",
                        unit: "cfu/swab",
                        method: "Compendium of Methods for the Microbiological Examination of Foods Fifth Edition Chapter 3 Microbiological Monitoring of the Food Processing Environment"
                    },
                    {
                        id: 8,
                        parameter: "C.perfringens",
                        unit: "cfu/swab",
                        method: "Compendium of Methods for the Microbiological Examination of Foods Fifth Edition Chapter 3 Microbiological Monitoring of the Food Processing Environment"
                    },
                    {
                        id: 9,
                        parameter: "Presumptive B.cereus",
                        unit: "cfu/swab",
                        method: "Compendium of Methods for the Microbiological Examination of Foods Fifth Edition Chapter 3 Microbiological Monitoring of the Food Processing Environment"
                    }
                ]
            },
            {
                no: 2,
                param: [
                    {
                        id: 10,
                        parameter: "APC",
                        unit: "cfu/swab",
                        method: "Compendium of Methods for the Microbiological Examination of Foods Fifth Edition Chapter 3 Microbiological Monitoring of the Food Processing Environment"
                    },
                    {
                        id: 11,
                        parameter: "Coliforms",
                        unit: "cfu/swab",
                        method: "Compendium of Methods for the Microbiological Examination of Foods Fifth Edition Chapter 3 Microbiological Monitoring of the Food Processing Environment"
                    },
                    {
                        id: 12,
                        parameter: "E.coli",
                        unit: "cfu/swab",
                        method: "Compendium of Methods for the Microbiological Examination of Foods Fifth Edition Chapter 3 Microbiological Monitoring of the Food Processing Environment"
                    },
                    {
                        id: 13,
                        parameter: "Yeast",
                        unit: "cfu/swab",
                        method: "Compendium of Methods for the Microbiological Examination of Foods Fifth Edition Chapter 3 Microbiological Monitoring of the Food Processing Environment"
                    },
                    {
                        id: 14,
                        parameter: "Mold",
                        unit: "cfu/swab",
                        method: "Compendium of Methods for the Microbiological Examination of Foods Fifth Edition Chapter 3 Microbiological Monitoring of the Food Processing Environment"
                    },
                    {
                        id: 15,
                        parameter: "Mold",
                        unit: "cfu/swab",
                        method: "Compendium of Methods for the Microbiological Examination of Foods Fifth Edition Chapter 3 Microbiological Monitoring of the Food Processing Environment"
                    }
                ]
            }
        ],
        table_source: [
            {
                sample_code: "Q25050029",
                sample_name: "Manhole + Inside T601 (Pre-mix tank)",
                time: "01.00",
                unit: "Mixing 4",
                mfg_date: "05/05/2025",
                parameter: [
                    {
                        id: 1,
                        result: "<10"
                    },
                    {
                        id: 2,
                        result: "<20"
                    },
                    {
                        id: 3,
                        result: "<30"
                    },
                    {
                        id: 4,
                        result: "<10"
                    },
                    {
                        id: 5,
                        result: "<10"
                    },
                    {
                        id: 6,
                        result: "<10"
                    },
                    {
                        id: 7,
                        result: "<10"
                    },
                    {
                        id: 8,
                        result: "<10"
                    },
                    {
                        id: 9,
                        result: "<10"
                    },
                    {
                        id: 10,
                        result: "<10"
                    },
                    {
                        id: 11,
                        result: "<10"
                    },
                    {
                        id: 12,
                        result: "<10"
                    },
                    {
                        id: 13,
                        result: "<10"
                    },
                    {
                        id: 14,
                        result: "-"
                    },
                    {
                        id: 15,
                        result: "-"
                    },
                ]
            },
            {
                sample_code: "Q25050030",
                sample_name: "Dissolving hopper (Powder Blender)",
                time: "01.00",
                unit: "Mixing 4",
                mfg_date: "05/05/2025",
                parameter: [
                    {
                        id: 1,
                        result: "<10"
                    },
                    {
                        id: 2,
                        result: "<20"
                    },
                    {
                        id: 3,
                        result: "<30"
                    },
                    {
                        id: 4,
                        result: "<10"
                    },
                    {
                        id: 5,
                        result: "<10"
                    },
                    {
                        id: 6,
                        result: "<10"
                    },
                    {
                        id: 7,
                        result: "<10"
                    },
                    {
                        id: 8,
                        result: "<10"
                    },
                    {
                        id: 9,
                        result: "<10"
                    },
                    {
                        id: 10,
                        result: "<10"
                    },
                    {
                        id: 11,
                        result: "<15"
                    },
                    {
                        id: 12,
                        result: "<10"
                    },
                    {
                        id: 13,
                        result: "<10"
                    },
                    {
                        id: 14,
                        result: "-"
                    },
                    {
                        id: 15,
                        result: "-"
                    },
                ]
            },
                        {
                sample_code: "Q25050030",
                sample_name: "Dissolving hopper (Powder Blender)",
                time: "01.00",
                unit: "Mixing 4",
                mfg_date: "05/05/2025",
                parameter: [
                    {
                        id: 1,
                        result: "<10"
                    },
                    {
                        id: 2,
                        result: "<20"
                    },
                    {
                        id: 3,
                        result: "<30"
                    },
                    {
                        id: 4,
                        result: "<10"
                    },
                    {
                        id: 5,
                        result: "<10"
                    },
                    {
                        id: 6,
                        result: "<10"
                    },
                    {
                        id: 7,
                        result: "<10"
                    },
                    {
                        id: 8,
                        result: "<10"
                    },
                    {
                        id: 9,
                        result: "<10"
                    },
                    {
                        id: 10,
                        result: "<10"
                    },
                    {
                        id: 11,
                        result: "<15"
                    },
                    {
                        id: 12,
                        result: "<10"
                    },
                    {
                        id: 13,
                        result: "<10"
                    },
                    {
                        id: 14,
                        result: "-"
                    },
                    {
                        id: 15,
                        result: "-"
                    },
                ]
            },
                        {
                sample_code: "Q25050030",
                sample_name: "Dissolving hopper (Powder Blender)",
                time: "01.00",
                unit: "Mixing 4",
                mfg_date: "05/05/2025",
                parameter: [
                    {
                        id: 1,
                        result: "<10"
                    },
                    {
                        id: 2,
                        result: "<20"
                    },
                    {
                        id: 3,
                        result: "<30"
                    },
                    {
                        id: 4,
                        result: "<10"
                    },
                    {
                        id: 5,
                        result: "<10"
                    },
                    {
                        id: 6,
                        result: "<10"
                    },
                    {
                        id: 7,
                        result: "<10"
                    },
                    {
                        id: 8,
                        result: "<10"
                    },
                    {
                        id: 9,
                        result: "<10"
                    },
                    {
                        id: 10,
                        result: "<10"
                    },
                    {
                        id: 11,
                        result: "<15"
                    },
                    {
                        id: 12,
                        result: "<10"
                    },
                    {
                        id: 13,
                        result: "<10"
                    },
                    {
                        id: 14,
                        result: "-"
                    },
                    {
                        id: 15,
                        result: "-"
                    },
                ]
            },

                        {
                sample_code: "Q25050030",
                sample_name: "Dissolving hopper (Powder Blender)",
                time: "01.00",
                unit: "Mixing 4",
                mfg_date: "05/05/2025",
                parameter: [
                    {
                        id: 1,
                        result: "<10"
                    },
                    {
                        id: 2,
                        result: "<20"
                    },
                    {
                        id: 3,
                        result: "<30"
                    },
                    {
                        id: 4,
                        result: "<10"
                    },
                    {
                        id: 5,
                        result: "<10"
                    },
                    {
                        id: 6,
                        result: "<10"
                    },
                    {
                        id: 7,
                        result: "<10"
                    },
                    {
                        id: 8,
                        result: "<10"
                    },
                    {
                        id: 9,
                        result: "<10"
                    },
                    {
                        id: 10,
                        result: "<10"
                    },
                    {
                        id: 11,
                        result: "<15"
                    },
                    {
                        id: 12,
                        result: "<10"
                    },
                    {
                        id: 13,
                        result: "<10"
                    },
                    {
                        id: 14,
                        result: "-"
                    },
                    {
                        id: 15,
                        result: "-"
                    },
                ]
            },
                        {
                sample_code: "Q25050030",
                sample_name: "Dissolving hopper (Powder Blender)",
                time: "01.00",
                unit: "Mixing 4",
                mfg_date: "05/05/2025",
                parameter: [
                    {
                        id: 1,
                        result: "<10"
                    },
                    {
                        id: 2,
                        result: "<20"
                    },
                    {
                        id: 3,
                        result: "<30"
                    },
                    {
                        id: 4,
                        result: "<10"
                    },
                    {
                        id: 5,
                        result: "<10"
                    },
                    {
                        id: 6,
                        result: "<10"
                    },
                    {
                        id: 7,
                        result: "<10"
                    },
                    {
                        id: 8,
                        result: "<10"
                    },
                    {
                        id: 9,
                        result: "<10"
                    },
                    {
                        id: 10,
                        result: "<10"
                    },
                    {
                        id: 11,
                        result: "<15"
                    },
                    {
                        id: 12,
                        result: "<10"
                    },
                    {
                        id: 13,
                        result: "<10"
                    },
                    {
                        id: 14,
                        result: "-"
                    },
                    {
                        id: 15,
                        result: "-"
                    },
                ]
            },
                        {
                sample_code: "Q25050030",
                sample_name: "Dissolving hopper (Powder Blender)",
                time: "01.00",
                unit: "Mixing 4",
                mfg_date: "05/05/2025",
                parameter: [
                    {
                        id: 1,
                        result: "<10"
                    },
                    {
                        id: 2,
                        result: "<20"
                    },
                    {
                        id: 3,
                        result: "<30"
                    },
                    {
                        id: 4,
                        result: "<10"
                    },
                    {
                        id: 5,
                        result: "<10"
                    },
                    {
                        id: 6,
                        result: "<10"
                    },
                    {
                        id: 7,
                        result: "<10"
                    },
                    {
                        id: 8,
                        result: "<10"
                    },
                    {
                        id: 9,
                        result: "<10"
                    },
                    {
                        id: 10,
                        result: "<10"
                    },
                    {
                        id: 11,
                        result: "<15"
                    },
                    {
                        id: 12,
                        result: "<10"
                    },
                    {
                        id: 13,
                        result: "<10"
                    },
                    {
                        id: 14,
                        result: "-"
                    },
                    {
                        id: 15,
                        result: "-"
                    },
                ]
            },
                        {
                sample_code: "Q25050030",
                sample_name: "Dissolving hopper (Powder Blender)",
                time: "01.00",
                unit: "Mixing 4",
                mfg_date: "05/05/2025",
                parameter: [
                    {
                        id: 1,
                        result: "<10"
                    },
                    {
                        id: 2,
                        result: "<20"
                    },
                    {
                        id: 3,
                        result: "<30"
                    },
                    {
                        id: 4,
                        result: "<10"
                    },
                    {
                        id: 5,
                        result: "<10"
                    },
                    {
                        id: 6,
                        result: "<10"
                    },
                    {
                        id: 7,
                        result: "<10"
                    },
                    {
                        id: 8,
                        result: "<10"
                    },
                    {
                        id: 9,
                        result: "<10"
                    },
                    {
                        id: 10,
                        result: "<10"
                    },
                    {
                        id: 11,
                        result: "<15"
                    },
                    {
                        id: 12,
                        result: "<10"
                    },
                    {
                        id: 13,
                        result: "<10"
                    },
                    {
                        id: 14,
                        result: "-"
                    },
                    {
                        id: 15,
                        result: "-"
                    },
                ]
            },
                        {
                sample_code: "Q25050030",
                sample_name: "Dissolving hopper (Powder Blender)",
                time: "01.00",
                unit: "Mixing 4",
                mfg_date: "05/05/2025",
                parameter: [
                    {
                        id: 1,
                        result: "<10"
                    },
                    {
                        id: 2,
                        result: "<20"
                    },
                    {
                        id: 3,
                        result: "<30"
                    },
                    {
                        id: 4,
                        result: "<10"
                    },
                    {
                        id: 5,
                        result: "<10"
                    },
                    {
                        id: 6,
                        result: "<10"
                    },
                    {
                        id: 7,
                        result: "<10"
                    },
                    {
                        id: 8,
                        result: "<10"
                    },
                    {
                        id: 9,
                        result: "<10"
                    },
                    {
                        id: 10,
                        result: "<10"
                    },
                    {
                        id: 11,
                        result: "<15"
                    },
                    {
                        id: 12,
                        result: "<10"
                    },
                    {
                        id: 13,
                        result: "<10"
                    },
                    {
                        id: 14,
                        result: "-"
                    },
                    {
                        id: 15,
                        result: "-"
                    },
                ]
            },
                        {
                sample_code: "Q25050030",
                sample_name: "Dissolving hopper (Powder Blender)",
                time: "01.00",
                unit: "Mixing 4",
                mfg_date: "05/05/2025",
                parameter: [
                    {
                        id: 1,
                        result: "<10"
                    },
                    {
                        id: 2,
                        result: "<20"
                    },
                    {
                        id: 3,
                        result: "<30"
                    },
                    {
                        id: 4,
                        result: "<10"
                    },
                    {
                        id: 5,
                        result: "<10"
                    },
                    {
                        id: 6,
                        result: "<10"
                    },
                    {
                        id: 7,
                        result: "<10"
                    },
                    {
                        id: 8,
                        result: "<10"
                    },
                    {
                        id: 9,
                        result: "<10"
                    },
                    {
                        id: 10,
                        result: "<10"
                    },
                    {
                        id: 11,
                        result: "<15"
                    },
                    {
                        id: 12,
                        result: "<10"
                    },
                    {
                        id: 13,
                        result: "<10"
                    },
                    {
                        id: 14,
                        result: "-"
                    },
                    {
                        id: 15,
                        result: "-"
                    },
                ]
            },
                        {
                sample_code: "Q25050030",
                sample_name: "Dissolving hopper (Powder Blender)",
                time: "01.00",
                unit: "Mixing 4",
                mfg_date: "05/05/2025",
                parameter: [
                    {
                        id: 1,
                        result: "<10"
                    },
                    {
                        id: 2,
                        result: "<20"
                    },
                    {
                        id: 3,
                        result: "<30"
                    },
                    {
                        id: 4,
                        result: "<10"
                    },
                    {
                        id: 5,
                        result: "<10"
                    },
                    {
                        id: 6,
                        result: "<10"
                    },
                    {
                        id: 7,
                        result: "<10"
                    },
                    {
                        id: 8,
                        result: "<10"
                    },
                    {
                        id: 9,
                        result: "<10"
                    },
                    {
                        id: 10,
                        result: "<10"
                    },
                    {
                        id: 11,
                        result: "<15"
                    },
                    {
                        id: 12,
                        result: "<10"
                    },
                    {
                        id: 13,
                        result: "<10"
                    },
                    {
                        id: 14,
                        result: "-"
                    },
                    {
                        id: 15,
                        result: "-"
                    },
                ]
            },

                        {
                sample_code: "Q25050030",
                sample_name: "Dissolving hopper (Powder Blender)",
                time: "01.00",
                unit: "Mixing 4",
                mfg_date: "05/05/2025",
                parameter: [
                    {
                        id: 1,
                        result: "<10"
                    },
                    {
                        id: 2,
                        result: "<20"
                    },
                    {
                        id: 3,
                        result: "<30"
                    },
                    {
                        id: 4,
                        result: "<10"
                    },
                    {
                        id: 5,
                        result: "<10"
                    },
                    {
                        id: 6,
                        result: "<10"
                    },
                    {
                        id: 7,
                        result: "<10"
                    },
                    {
                        id: 8,
                        result: "<10"
                    },
                    {
                        id: 9,
                        result: "<10"
                    },
                    {
                        id: 10,
                        result: "<10"
                    },
                    {
                        id: 11,
                        result: "<15"
                    },
                    {
                        id: 12,
                        result: "<10"
                    },
                    {
                        id: 13,
                        result: "<10"
                    },
                    {
                        id: 14,
                        result: "-"
                    },
                    {
                        id: 15,
                        result: "-"
                    },
                ]
            },
                        {
                sample_code: "Q25050030",
                sample_name: "Dissolving hopper (Powder Blender)",
                time: "01.00",
                unit: "Mixing 4",
                mfg_date: "05/05/2025",
                parameter: [
                    {
                        id: 1,
                        result: "<10"
                    },
                    {
                        id: 2,
                        result: "<20"
                    },
                    {
                        id: 3,
                        result: "<30"
                    },
                    {
                        id: 4,
                        result: "<10"
                    },
                    {
                        id: 5,
                        result: "<10"
                    },
                    {
                        id: 6,
                        result: "<10"
                    },
                    {
                        id: 7,
                        result: "<10"
                    },
                    {
                        id: 8,
                        result: "<10"
                    },
                    {
                        id: 9,
                        result: "<10"
                    },
                    {
                        id: 10,
                        result: "<10"
                    },
                    {
                        id: 11,
                        result: "<15"
                    },
                    {
                        id: 12,
                        result: "<10"
                    },
                    {
                        id: 13,
                        result: "<10"
                    },
                    {
                        id: 14,
                        result: "-"
                    },
                    {
                        id: 15,
                        result: "-"
                    },
                ]
            },
                        {
                sample_code: "Q25050030",
                sample_name: "Dissolving hopper (Powder Blender)",
                time: "01.00",
                unit: "Mixing 4",
                mfg_date: "05/05/2025",
                parameter: [
                    {
                        id: 1,
                        result: "<10"
                    },
                    {
                        id: 2,
                        result: "<20"
                    },
                    {
                        id: 3,
                        result: "<30"
                    },
                    {
                        id: 4,
                        result: "<10"
                    },
                    {
                        id: 5,
                        result: "<10"
                    },
                    {
                        id: 6,
                        result: "<10"
                    },
                    {
                        id: 7,
                        result: "<10"
                    },
                    {
                        id: 8,
                        result: "<10"
                    },
                    {
                        id: 9,
                        result: "<10"
                    },
                    {
                        id: 10,
                        result: "<10"
                    },
                    {
                        id: 11,
                        result: "<15"
                    },
                    {
                        id: 12,
                        result: "<10"
                    },
                    {
                        id: 13,
                        result: "<10"
                    },
                    {
                        id: 14,
                        result: "-"
                    },
                    {
                        id: 15,
                        result: "-"
                    },
                ]
            },
                        {
                sample_code: "Q25050030",
                sample_name: "Dissolving hopper (Powder Blender)",
                time: "01.00",
                unit: "Mixing 4",
                mfg_date: "05/05/2025",
                parameter: [
                    {
                        id: 1,
                        result: "<10"
                    },
                    {
                        id: 2,
                        result: "<20"
                    },
                    {
                        id: 3,
                        result: "<30"
                    },
                    {
                        id: 4,
                        result: "<10"
                    },
                    {
                        id: 5,
                        result: "<10"
                    },
                    {
                        id: 6,
                        result: "<10"
                    },
                    {
                        id: 7,
                        result: "<10"
                    },
                    {
                        id: 8,
                        result: "<10"
                    },
                    {
                        id: 9,
                        result: "<10"
                    },
                    {
                        id: 10,
                        result: "<10"
                    },
                    {
                        id: 11,
                        result: "<15"
                    },
                    {
                        id: 12,
                        result: "<10"
                    },
                    {
                        id: 13,
                        result: "<10"
                    },
                    {
                        id: 14,
                        result: "-"
                    },
                    {
                        id: 15,
                        result: "-"
                    },
                ]
            },
                        {
                sample_code: "Q25050030",
                sample_name: "Dissolving hopper (Powder Blender)",
                time: "01.00",
                unit: "Mixing 4",
                mfg_date: "05/05/2025",
                parameter: [
                    {
                        id: 1,
                        result: "<10"
                    },
                    {
                        id: 2,
                        result: "<20"
                    },
                    {
                        id: 3,
                        result: "<30"
                    },
                    {
                        id: 4,
                        result: "<10"
                    },
                    {
                        id: 5,
                        result: "<10"
                    },
                    {
                        id: 6,
                        result: "<10"
                    },
                    {
                        id: 7,
                        result: "<10"
                    },
                    {
                        id: 8,
                        result: "<10"
                    },
                    {
                        id: 9,
                        result: "<10"
                    },
                    {
                        id: 10,
                        result: "<10"
                    },
                    {
                        id: 11,
                        result: "<15"
                    },
                    {
                        id: 12,
                        result: "<10"
                    },
                    {
                        id: 13,
                        result: "<10"
                    },
                    {
                        id: 14,
                        result: "-"
                    },
                    {
                        id: 15,
                        result: "-"
                    },
                ]
            },
                        {
                sample_code: "Q25050030",
                sample_name: "Dissolving hopper (Powder Blender)",
                time: "01.00",
                unit: "Mixing 4",
                mfg_date: "05/05/2025",
                parameter: [
                    {
                        id: 1,
                        result: "<10"
                    },
                    {
                        id: 2,
                        result: "<20"
                    },
                    {
                        id: 3,
                        result: "<30"
                    },
                    {
                        id: 4,
                        result: "<10"
                    },
                    {
                        id: 5,
                        result: "<10"
                    },
                    {
                        id: 6,
                        result: "<10"
                    },
                    {
                        id: 7,
                        result: "<10"
                    },
                    {
                        id: 8,
                        result: "<10"
                    },
                    {
                        id: 9,
                        result: "<10"
                    },
                    {
                        id: 10,
                        result: "<10"
                    },
                    {
                        id: 11,
                        result: "<15"
                    },
                    {
                        id: 12,
                        result: "<10"
                    },
                    {
                        id: 13,
                        result: "<10"
                    },
                    {
                        id: 14,
                        result: "-"
                    },
                    {
                        id: 15,
                        result: "-"
                    },
                ]
            },            {
                sample_code: "Q25050030",
                sample_name: "Dissolving hopper (Powder Blender)",
                time: "01.00",
                unit: "Mixing 4",
                mfg_date: "05/05/2025",
                parameter: [
                    {
                        id: 1,
                        result: "<10"
                    },
                    {
                        id: 2,
                        result: "<20"
                    },
                    {
                        id: 3,
                        result: "<30"
                    },
                    {
                        id: 4,
                        result: "<10"
                    },
                    {
                        id: 5,
                        result: "<10"
                    },
                    {
                        id: 6,
                        result: "<10"
                    },
                    {
                        id: 7,
                        result: "<10"
                    },
                    {
                        id: 8,
                        result: "<10"
                    },
                    {
                        id: 9,
                        result: "<10"
                    },
                    {
                        id: 10,
                        result: "<10"
                    },
                    {
                        id: 11,
                        result: "<15"
                    },
                    {
                        id: 12,
                        result: "<10"
                    },
                    {
                        id: 13,
                        result: "<10"
                    },
                    {
                        id: 14,
                        result: "-"
                    },
                    {
                        id: 15,
                        result: "-"
                    },
                ]
            },            {
                sample_code: "Q25050030",
                sample_name: "Dissolving hopper (Powder Blender)",
                time: "01.00",
                unit: "Mixing 4",
                mfg_date: "05/05/2025",
                parameter: [
                    {
                        id: 1,
                        result: "<10"
                    },
                    {
                        id: 2,
                        result: "<20"
                    },
                    {
                        id: 3,
                        result: "<30"
                    },
                    {
                        id: 4,
                        result: "<10"
                    },
                    {
                        id: 5,
                        result: "<10"
                    },
                    {
                        id: 6,
                        result: "<10"
                    },
                    {
                        id: 7,
                        result: "<10"
                    },
                    {
                        id: 8,
                        result: "<10"
                    },
                    {
                        id: 9,
                        result: "<10"
                    },
                    {
                        id: 10,
                        result: "<10"
                    },
                    {
                        id: 11,
                        result: "<15"
                    },
                    {
                        id: 12,
                        result: "<10"
                    },
                    {
                        id: 13,
                        result: "<10"
                    },
                    {
                        id: 14,
                        result: "-"
                    },
                    {
                        id: 15,
                        result: "-"
                    },
                ]
            },            {
                sample_code: "Q25050030",
                sample_name: "Dissolving hopper (Powder Blender)",
                time: "01.00",
                unit: "Mixing 4",
                mfg_date: "05/05/2025",
                parameter: [
                    {
                        id: 1,
                        result: "<10"
                    },
                    {
                        id: 2,
                        result: "<20"
                    },
                    {
                        id: 3,
                        result: "<30"
                    },
                    {
                        id: 4,
                        result: "<10"
                    },
                    {
                        id: 5,
                        result: "<10"
                    },
                    {
                        id: 6,
                        result: "<10"
                    },
                    {
                        id: 7,
                        result: "<10"
                    },
                    {
                        id: 8,
                        result: "<10"
                    },
                    {
                        id: 9,
                        result: "<10"
                    },
                    {
                        id: 10,
                        result: "<10"
                    },
                    {
                        id: 11,
                        result: "<15"
                    },
                    {
                        id: 12,
                        result: "<10"
                    },
                    {
                        id: 13,
                        result: "<10"
                    },
                    {
                        id: 14,
                        result: "-"
                    },
                    {
                        id: 15,
                        result: "-"
                    },
                ]
            },
        ],
        remark: [
            {
                text: "QIP Peptein 4000  Loop 1"
            }
        ],
        approver: {
            name: "Supaporn Rotsakan",
            position: "Quality Control Microbiology Lead",
            signature: signatureBase64
        },
        footer: {
            form_id: "F-AY-Q-QCD-052",
            revision: "02",
            effective_date: "01 Apr 2023",
            address: "48/2 Moo 7, Khlong Suan Phlu ,Phra Nakhon Si Ayutthaya , Ayutthaya 1300"
        }
    }

    return data;
}