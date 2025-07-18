export type SampleLabel = {
    sample_name: string;
    material_code: string;
    lot_no: string;
    log_date: string;
    lab_test_name: string;
    time: string;
    parameter: string,
    sample_code: string,
    seq: number,
    total: number
}

export type ChemicalLabel = {
    chemical_name: string;
    lot_no: string;
    number_of_bottle: string;
    received_date: string;
    expiry_date: string;
    storage_condition: string;
}

export type EquipmentLabel = {
    certification_no: string;
    equipment_code: string;
    result: string;
    calibrated_by: string;
    is_available: boolean;
}

export type Remark = {
    text: string
}

export type Approver = {
    name: string;
    position: string;
    signature: string;
}

export type HeaderCertA = {
    report_heading: string;
    sample_name: string;
    sample_detail: string;
    sample_description: string
    sample_condition: string;
    analysis_date: string;
    customer_contact: string;
    sample_code: string;
    received_date: string;
    report_date: string;
    report_no: string;
    reg_no: string;
}

export type HeaderCertB = {
    report_heading: string;
    product_name: string;
    lot_no: string;
    mfg_date: string
    best_before: string;
    analytical_date: string;
    no: string;
    received_date: string;
    report_date: string;
    report_no: string;
    reg_no: string;
}

export type HeaderCertD = {
    received_by: string;
    received_date: string;
    request_no: string;
    report_date: string;
}

export type HeaderCertE = {
    request_no: string;
    request_by: string;
    received_date: string;
    received_by: string;
    analysis_date: string;
    report_date: string;
}

export type Footer = {
    form_id: string;
    revision: string;
    effective_date: string;
    address: string;
}

export type TableCert = {
    test_items: string;
    lod: string;
    loq: string;
    results: string;
    specification: string;
    unit: string;
    method: string;
    is_header: boolean;
    is_special: boolean;
}

export type ChemicalCert = {
    sample_name: string;
    sample_code: string;
    sampling_date: string;
    time: string;
    line: string; 
    parameter: ChemParamTable[]
}

export type ChemParamTable = {
    parameter: string;
    results: string;
    unit: string;
    method: string;
}

export type CertTemplateA = {
    file_name: string;
    is_accredited: boolean;
    header: HeaderCertA;
    table_source: TableCert[];
    decision: string;
    remark: Remark[];
    approver: Approver;
    footer: Footer;
}

export type CertTemplateB = {
    file_name: string;
    is_accredited: boolean;
    header: HeaderCertB;
    table_source: TableCert[];
    conclusion: string;
    remark: Remark[];
    approver: Approver;
    footer: Footer;
}

export type CertTemplateC = {
    file_name: string;
    is_accredited: boolean;
    header: HeaderCertA;
    table_source: TableCert[];
    decision: string;
    remark: Remark[];
    approver: Approver;
    footer: Footer;
}

export type CertTemplateD = {
    file_name: string;
    header: HeaderCertD;
    table_source: ChemicalCert[];
    remark: Remark[];
    approver: Approver;
    footer: Footer;
}

export type MicroParam = {
    id: number;
    parameter: string;
    unit: string;
    method: string;
}

export type MicroParamTable = {
    no: number;
    param: MicroParam[];
}

export type MicroResult = {
    id: number;
    result: string;
}

export type MicroResultTable = {
    sample_code: string;
    sample_name: string;
    time: string;
    unit: string;
    mfg_date: string;
    parameter: MicroResult[]
}

export type CertTemplateE = {
    file_name: string;
    header: HeaderCertE;
    parameter: MicroParamTable[];
    table_source: MicroResultTable[];
    remark: Remark[];
    approver: Approver;
    footer: Footer;
}