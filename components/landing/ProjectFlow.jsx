import { useTranslations } from "next-intl";
import ProjectFlowMockup from "../ProjectFlowMockup"
import SectionHeader from "../SectionHeader"

const ProjectFlow = () => {
      const t = useTranslations("LandingPage.ProjectFlow");
    
  return (
    <section className="container my-10 px-3">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-5">
        <SectionHeader
            label={t("label")}
            title={t("title")}
            description={t("description")}
            align="start"
        />
        <ProjectFlowMockup />
      </div>
    </section>
  )
}

export default ProjectFlow
