import { useLanguage } from '../../hooks/useLanguage';
import React from 'react';
import { motion } from 'framer-motion';
import { SiLinux, SiPrometheus, SiGrafana, SiDocker, SiTerraform, SiGithubactions, SiGit, SiPython, SiJavascript, SiReact, SiNextdotjs, SiLaravel } from 'react-icons/si';
import { FaWindows, FaAws, FaNetworkWired, FaServer } from 'react-icons/fa';
import SkillSphere from '../ui/SkillSphere';
import { sphereSkills } from '../../data/skills';

interface Skill {
  name: string;
  icon: React.ReactNode;
}

const SkillTag = ({ name, icon }: Skill) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-[#161616] border border-[#27272a] rounded-xl hover:border-[#8b5cf6] hover:bg-[#1c1c20] transition-all duration-300 group cursor-default">
    <span className="text-xl group-hover:scale-110 transition-transform duration-300">
      {icon}
    </span>
    <span className="text-sm font-medium text-[#a1a1aa] group-hover:text-[#e4e4e7] transition-colors">
      {name}
    </span>
  </div>
);

const SkillsSection: React.FC = () => {
  const { t } = useLanguage();
  const skillGroups = [
    {
      skills: [
        { name: "Linux", icon: <SiLinux className="text-[#FCC624]" /> },
        { name: "Windows", icon: <FaWindows className="text-[#00A4EF]" /> },
        { name: t("Networking fundamentals"), icon: <FaNetworkWired className="text-[#A78BFA]" /> },
        { name: t("Virtualization"), icon: <FaServer className="text-[#A78BFA]" /> },
        { name: "Prometheus", icon: <SiPrometheus className="text-[#E6522C]" /> },
        { name: "Grafana", icon: <SiGrafana className="text-[#F46800]" /> },
      ],
    },
    {
      skills: [
        { name: "Docker", icon: <SiDocker className="text-[#2496ED]" /> },
        { name: "AWS", icon: <FaAws className="text-[#FF9900]" /> },
        { name: "Terraform", icon: <SiTerraform className="text-[#844FBA]" /> },
        { name: "GitHub Actions", icon: <SiGithubactions className="text-[#2088FF]" /> },
        { name: "Git", icon: <SiGit className="text-[#F05032]" /> },
      ],
    },
    {
      skills: [
        { name: "Python", icon: <SiPython className="text-[#3776AB]" /> },
        { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" /> },
        { name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
        { name: "Next.js", icon: <SiNextdotjs className="text-[#A1A1AA]" /> },
        { name: "Laravel", icon: <SiLaravel className="text-[#FF2D20]" /> },
      ],
    },
  ];

  return (
    <section id="skills" className="py-12 md:py-16 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, var(--gradient-start) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div className="section relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium bg-[var(--accent)]/10 text-[var(--accent)] rounded-full border border-[var(--accent)]/20">
            {t("Tech Stack")}
          </span>
          <h2 className="text-[var(--foreground)] mb-4">
            <span className="gradient-text">{t("My Skills")}</span>
          </h2>
          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
            {t("Tools for systems administration, monitoring, cloud infrastructure, and web development.")}
          </p>
        </motion.div>

        {/* 3D Skill Sphere */}
        <motion.div
          className="h-[400px] md:h-[550px] mb-16 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <SkillSphere
            skills={sphereSkills.map((skill) => ({ ...skill, name: t(skill.name) }))}
            radius={4.5}
            autoRotateSpeed={0.08}
          />
        </motion.div>

        <div className="mt-12 flex flex-col items-center justify-center gap-6">
          {skillGroups.map(({ skills }, index) => (
            <motion.article
              key={skills[0].name}
              className="flex max-w-5xl flex-col items-center px-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="flex flex-wrap justify-center gap-4">
                {skills.map((skill) => (
                  <SkillTag key={skill.name} name={skill.name} icon={skill.icon} />
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
