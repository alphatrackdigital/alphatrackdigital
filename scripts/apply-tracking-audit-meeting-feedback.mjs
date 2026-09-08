import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const write = (file, content) => fs.writeFileSync(path.join(root, file), content);

const replaceRequired = (content, search, replacement, label) => {
  const count = typeof search === "string"
    ? content.split(search).length - 1
    : [...content.matchAll(new RegExp(search.source, search.flags.includes("g") ? search.flags : `${search.flags}g`))].length;
  if (count !== 1) throw new Error(`${label}: expected exactly one match, found ${count}`);
  return content.replace(search, replacement);
};

const oldSpendEnum = `monthlyAdSpendBand: z.enum(\n    ["paused_or_not_spending", "under_1500", "1500_2999", "3000_5999", "6000_14999", "15000_plus", "not_sure"],\n    { required_error: "Select a spend range" },\n  ),`;
const newSpendEnum = `monthlyAdSpendBand: z.enum(\n    TRACKING_AUDIT_SPEND_VALUES,\n    { required_error: "Select a spend range" },\n  ),`;

const oldSpendOptions = `const SPEND_OPTIONS = [\n  { value: "paused_or_not_spending", label: "Not spending" },\n  { value: "under_1500", label: "Under GHS 1.5k" },\n  { value: "1500_2999", label: "GHS 1.5k–3k" },\n  { value: "3000_5999", label: "GHS 3k–6k" },\n  { value: "6000_14999", label: "GHS 6k–15k" },\n  { value: "15000_plus", label: "GHS 15k+" },\n  { value: "not_sure", label: "Not sure" },\n] as const;`;

const trackingImport = `import { pushLeadSubmissionEvent } from "@/lib/tracking";`;

const patchGeneral = () => {
  const file = "src/pages/TrackingLandingPage.tsx";
  let content = read(file);

  content = replaceRequired(
    content,
    trackingImport,
    `${trackingImport}\nimport { TRACKING_AUDIT_SPEND_VALUES, useGeneralAuditSpendCurrency } from "@/lib/trackingAuditSpend";`,
    `${file} spend import`,
  );
  content = replaceRequired(
    content,
    `industry: z.enum(["professional_services", "education_training", "ecommerce_dtc", "real_estate", "other"], {`,
    `industry: z.enum(["professional_services", "education_training", "ecommerce_dtc", "real_estate", "saas", "other"], {`,
    `${file} SaaS schema`,
  );
  content = replaceRequired(content, oldSpendEnum, newSpendEnum, `${file} spend enum`);
  content = replaceRequired(
    content,
    `  { value: "real_estate", label: "Real estate" },\n  { value: "other", label: "Other" },`,
    `  { value: "real_estate", label: "Real estate" },\n  { value: "saas", label: "SaaS" },\n  { value: "other", label: "Other" },`,
    `${file} SaaS option`,
  );
  content = replaceRequired(content, `${oldSpendOptions}\n\n`, "", `${file} old spend options`);
  content = replaceRequired(
    content,
    `  const finalCtaTo = withCampaignSearch(TRACKING_AUDIT_ANCHOR_CTA.to, location.search);`,
    `  const finalCtaTo = withCampaignSearch(TRACKING_AUDIT_ANCHOR_CTA.to, location.search);\n  const { currency: spendCurrency, setCurrency: setSpendCurrency, options: spendOptions } = useGeneralAuditSpendCurrency();`,
    `${file} currency hook`,
  );
  content = replaceRequired(
    content,
    `    control,\n    trigger,\n    formState: { errors },`,
    `    control,\n    trigger,\n    resetField,\n    formState: { errors },`,
    `${file} resetField`,
  );
  content = replaceRequired(
    content,
    `                          <Field label="Monthly ad spend" htmlFor="f-spend" error={errors.monthlyAdSpendBand?.message}>\n                            <Controller control={control} name="monthlyAdSpendBand" render={({ field }) => (\n                              <FormSelect id="f-spend" label="Monthly ad spend" value={field.value} onValueChange={field.onChange} options={SPEND_OPTIONS} placeholder="Select spend range" error={errors.monthlyAdSpendBand?.message} />\n                            )} />\n                          </Field>`,
    `                          <Field label="Monthly ad spend" htmlFor="f-spend" error={errors.monthlyAdSpendBand?.message}>\n                            <div className="mb-2 flex items-center justify-between gap-3">\n                              <span className="text-[11px] leading-4 text-muted-foreground">Amounts shown in {spendCurrency}.</span>\n                              <div className="inline-flex rounded-lg border border-white/[0.08] bg-white/[0.025] p-0.5" role="group" aria-label="Monthly ad spend currency">\n                                {(["GHS", "USD"] as const).map((currency) => (\n                                  <button\n                                    key={currency}\n                                    type="button"\n                                    aria-pressed={spendCurrency === currency}\n                                    onClick={() => {\n                                      if (currency === spendCurrency) return;\n                                      resetField("monthlyAdSpendBand");\n                                      setSpendCurrency(currency);\n                                    }}\n                                    className={\`rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors \${\n                                      spendCurrency === currency\n                                        ? "bg-primary/15 text-primary"\n                                        : "text-muted-foreground hover:text-foreground"\n                                    }\`}\n                                  >\n                                    {currency}\n                                  </button>\n                                ))}\n                              </div>\n                            </div>\n                            <Controller control={control} name="monthlyAdSpendBand" render={({ field }) => (\n                              <FormSelect id="f-spend" label="Monthly ad spend" value={field.value} onValueChange={field.onChange} options={spendOptions} placeholder="Select spend range" error={errors.monthlyAdSpendBand?.message} />\n                            )} />\n                            <p className="mt-1.5 text-[10px] leading-4 text-muted-foreground/70">Ghana visitors are shown cedis when location is available. You can change the currency above.</p>\n                          </Field>`,
    `${file} spend field`,
  );
  content = replaceRequired(
    content,
    `answer: "We aim to review applications within one business day. If your application is accepted, we’ll confirm the audit timing before we begin.",`,
    `answer: "We review applications in order. If your application is accepted, we’ll confirm the audit scope and timing by email before we begin.",`,
    `${file} SLA FAQ`,
  );

  write(file, content);
};

const verticalFiles = [
  "src/pages/TrackingAuditProfessionalServices.tsx",
  "src/pages/TrackingAuditEducation.tsx",
  "src/pages/TrackingAuditRealEstate.tsx",
];

const patchVertical = (file) => {
  let content = read(file);
  content = replaceRequired(
    content,
    trackingImport,
    `${trackingImport}\nimport { GHS_TRACKING_AUDIT_SPEND_OPTIONS, TRACKING_AUDIT_SPEND_VALUES } from "@/lib/trackingAuditSpend";`,
    `${file} spend import`,
  );
  content = replaceRequired(content, oldSpendEnum, newSpendEnum, `${file} spend enum`);
  content = replaceRequired(
    content,
    oldSpendOptions,
    `const SPEND_OPTIONS = GHS_TRACKING_AUDIT_SPEND_OPTIONS;`,
    `${file} GHS spend options`,
  );
  content = replaceRequired(
    content,
    `answer: "We aim to review applications within one business day. If your application is accepted, we’ll confirm the audit scope and timing before we begin.",`,
    `answer: "We review applications in order. If your application is accepted, we’ll confirm the audit scope and timing by email before we begin.",`,
    `${file} SLA FAQ`,
  );
  content = replaceRequired(content, "text-amber-100/70 shadow-[0_8px_24px_rgba(0,0,0,0.10)]", "text-amber-100/95 shadow-[0_8px_24px_rgba(0,0,0,0.10)]", `${file} journey chip contrast`);
  content = replaceRequired(content, "text-[11px] text-amber-100/60", "text-[11px] text-amber-100/90", `${file} journey break contrast`);
  write(file, content);
};

const patchSharedSuccess = () => {
  const file = "src/components/shared/TrackingAuditShared.tsx";
  let content = read(file);
  content = replaceRequired(
    content,
    `We’ll review it and email you within one business day if the audit is a good fit.`,
    `We’ll review it for fit and email you with the next step and timing if the audit is accepted.`,
    `${file} success SLA`,
  );
  write(file, content);
};

const patchFooter = () => {
  const file = "src/components/layout/Footer.tsx";
  let content = read(file);
  content = replaceRequired(
    content,
    `              <a href={companyProfile.contact.phoneHref} className="transition-colors hover:text-primary">\n                {companyProfile.contact.phoneDisplay}\n              </a>\n              <a href={companyProfile.contact.secondaryPhoneHref} className="transition-colors hover:text-primary">\n                {companyProfile.contact.secondaryPhoneDisplay}\n              </a>\n`,
    "",
    `${file} public phone links`,
  );
  write(file, content);
};

const patchHomepageSchema = () => {
  const file = "src/pages/Index.tsx";
  let content = read(file);
  content = replaceRequired(
    content,
    `        telephone: companyProfile.contact.phoneHref.replace("tel:", ""),\n`,
    "",
    `${file} structured-data phone`,
  );
  write(file, content);
};

const patchTests = () => {
  const uat = "e2e/tracking-audit-beta-application-uat.spec.ts";
  let content = read(uat);
  content = replaceRequired(
    content,
    `selectCombobox(page, "Monthly ad spend", "GHS 3k–6k")`,
    `selectCombobox(page, "Monthly ad spend", "$500–999")`,
    `${uat} general spend`,
  );
  const roughCount = content.split(`selectCombobox(page, "Rough monthly ad spend", "GHS 3k–6k")`).length - 1;
  if (roughCount !== 3) throw new Error(`${uat}: expected 3 vertical spend selections, found ${roughCount}`);
  content = content.replaceAll(
    `selectCombobox(page, "Rough monthly ad spend", "GHS 3k–6k")`,
    `selectCombobox(page, "Rough monthly ad spend", "GHS 5,000–9,999")`,
  );
  content = replaceRequired(
    content,
    `page.getByText("We’ll review it and email you within one business day if the audit is a good fit.", { exact: true })`,
    `page.getByText("We’ll review it for fit and email you with the next step and timing if the audit is accepted.", { exact: true })`,
    `${uat} success copy`,
  );
  write(uat, content);

  const generalResponsive = "e2e/tracking-audit.responsive.spec.ts";
  content = read(generalResponsive);
  content = replaceRequired(content, `"GHS 3k–6k"`, `"$500–999"`, `${generalResponsive} spend`);
  write(generalResponsive, content);

  for (const file of [
    "e2e/tracking-audit-professional-services.visual.spec.ts",
    "e2e/tracking-audit-education.visual.spec.ts",
    "e2e/tracking-audit-real-estate.visual.spec.ts",
  ]) {
    content = read(file);
    const count = content.split(`"GHS 3k–6k"`).length - 1;
    if (count !== 2) throw new Error(`${file}: expected 2 spend selections, found ${count}`);
    content = content.replaceAll(`"GHS 3k–6k"`, `"GHS 5,000–9,999"`);
    write(file, content);
  }
};

patchGeneral();
verticalFiles.forEach(patchVertical);
patchSharedSuccess();
patchFooter();
patchHomepageSchema();
patchTests();

console.log("Applied Tracking Audit meeting feedback patch.");
