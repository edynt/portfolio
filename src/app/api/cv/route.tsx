/* API route that generates PDF CV from portfolio data */
import { renderToBuffer } from "@react-pdf/renderer";
import CvDocument from "@/components/cv-document";
import { personalInfo } from "@/data/portfolio-data";

export async function GET() {
  const buffer = await renderToBuffer(<CvDocument />);

  const filename = `${personalInfo.name.replace(/\s+/g, "_")}_CV.pdf`;

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
