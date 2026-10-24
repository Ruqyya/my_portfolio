// More work from the owner's Behance profile (behance.net/ghulamruqyya), chosen for relevance to product and SaaS clients.
// Covers are the public Behance covers. Each card opens the project on Behance.
export interface ExtraProject {
  title: string;
  kind: string;
  url: string;
  cover: string;
}

const cdn = "https://mir-s3-cdn-cf.behance.net/projects";

export const extraProjects: ExtraProject[] = [
  { title: "Glorizon Marketplace Dashboard", kind: "SaaS · Dashboard", url: "https://www.behance.net/gallery/248941997/Glorizon-NFT-Marketplace-Dashboard-Design", cover: `${cdn}/808/a0f7f4248941997.Y3JvcCwxMjQwLDk2OSwwLDIwOA.png` },
  { title: "Tech Sales Academy", kind: "Education · Landing page", url: "https://www.behance.net/gallery/248942347/Tech-Sales-Academy-Landing-Page", cover: `${cdn}/808/149a5d248942347.Y3JvcCwxMjQwLDk2OSwwLDA.png` },
  { title: "Sport Trade", kind: "Fintech · Website", url: "https://www.behance.net/gallery/248942617/Sport-Trade-Website-Design", cover: `${cdn}/808/6d9dac248942617.Y3JvcCwyNDgwLDE5MzksMCww.png` },
  { title: "Tikajob", kind: "Jobs · Mobile app", url: "https://www.behance.net/gallery/248939105/Tikajob-App-Design", cover: `${cdn}/808/189a13248939105.Y3JvcCwxMDUzLDgyMywwLDE1MQ.png` },
  { title: "Call Law", kind: "Legal · Mobile app", url: "https://www.behance.net/gallery/248938291/Call-Law-App-Design", cover: `${cdn}/808/fe888e248938291.Y3JvcCwxNDM4LDExMjUsNDc3LDA.png` },
];

// The newest Behance pages for the case studies on this site. The older ids in behance-projects.json still work as embeds.
export const behanceLive: Record<string, string> = {
  "oladoc-healthcare-app-ui-ux-design": "https://www.behance.net/gallery/257283625/Oladoc-End-to-End-Healthcare-UXUI-Case-Study",
  "marham-pk-healthcare-platform-redesign": "https://www.behance.net/gallery/257435545/Marhampk-Redesign-Healthcare-UXUI-Case-Study",
  "shumaila-s-london-clinic-website-redesign": "https://www.behance.net/gallery/257474413/Shumailas-London-Aesthetic-Clinic-Website",
  "zental-dental-luxury-website-ui-ux": "https://www.behance.net/gallery/257482109/Zental-Dental-Luxury-Private-Dental-Website-UIUX",
  "victoria-road-dental-website-redesign": "https://www.behance.net/gallery/257482013/Victoria-Road-Dental-Website-UIUX-Design",
  "lumina-dental-website-ui-ux-design": "https://www.behance.net/gallery/257481905/Lumina-Dental-Luxury-Landing-Page-Design",
  "goddard-veterinary-website-redesign": "https://www.behance.net/gallery/257481807/Goddard-Vet-Group-Website-UIUX-Redesign",
  "bondvet-veterinary-website-ui-ux-design": "https://www.behance.net/gallery/257481691/Bond-Vet-Landing-Page-UIUX-Redesign",
  "sehat-kahani-telemedicine-ui-ux-design": "https://www.behance.net/gallery/257473887/Sehat-Kahani-Telehealth-Website-Redesign",
};
