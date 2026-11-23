import { useLanguage } from '../../hooks/useLanguage';
import React from "react";
import { motion } from "framer-motion";
import { projects } from "../../data/projects";
import ProjectCard from "../ui/ProjectCard";
import { githubProfile } from "../../data/socialLinks";
import { GitHubIcon } from "../icons";

const ProjectsSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="section">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium bg-[var(--accent)]/10 text-[var(--accent)] rounded-full border border-[var(--accent)]/20">
            {t("Featured Work")}
          </span>
          <h2 className="text-[var(--foreground)] mb-4">{t("Projects I've Built")}</h2>
          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
            {t("Selected work in cybersecurity, cloud infrastructure, and web development.")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard
                index={index + 1}
                title={t(project.title)}
                description={t(project.description)}
                image={project.image}
                imageFit={project.imageFit}
                type={t(project.type || "Project")}
                tags={project.tags.map(t)}
                github={project.github}
                link={project.link}
                gradientFrom={project.gradientFrom}
                gradientTo={project.gradientTo}
                disableGithub={project.disableGithub}
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href={`${githubProfile}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="showcase-glass inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] px-6 py-3 font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)]"
          >
            <GitHubIcon size={20} />
            {t("View All Projects on GitHub")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
