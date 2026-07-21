import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { githubStats } from "../data/content";
import { profile } from "../data/profile";
import { inView, fadeUp, staggerContainer } from "../utils/motion";
import { Github, Star, GitFork, Users, GitCommit } from "lucide-react";

/**
 * GitHub Stats — contribution heatmap, top repos, language ratio, badges.
 *
 * `contributionGraph` is currently a static mock array; wire it to the
 * GitHub REST/GraphQL API or a service like github-readme-stats for real
 * numbers. Paneled in glass to match the AI-lab theme.
 */
export default function GitHubStats() {
  return (
    <section id="github" className="gh section">
      <div className="container">
        <SectionHeading
          index="(08) — GitHub"
          title={["In the", "open."]}
          description="My open-source trail — pushes, forks, and the things I keep building on GitHub."
        />

        <motion.div
          className="gh__layout"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          {/* Left column — top stat cards + repo cards */}
          <div className="gh__col gh__col--main">
            <div className="gh__stat-row">
              <StatCard icon={GitCommit} value={githubStats.contributions} label="Contributions (yr)" />
              <StatCard icon={GitFork} value={githubStats.repos} label="Repositories" />
              <StatCard icon={Star} value={githubStats.Stars} label="Stars earned" />
              <StatCard icon={Users} value={githubStats.followers} label="Followers" />
            </div>

            <motion.div className="gh__repos" variants={fadeUp}>
              <div className="gh__sub-head">
                <span className="eyebrow">Pinned repositories</span>
                <a
                  className="gh__view font-mono"
                  href={githubStats.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="hover"
                  data-cursor-label="GitHub"
                >
                  <Github size={14} aria-hidden /> @{githubStats.username}
                </a>
              </div>
              <div className="gh__repo-grid">
                {githubStats.topRepos.map((r) => (
                  <a
                    key={r.name}
                    href={`${githubStats.url}/${githubStats.username}/${r.name}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="gh__repo"
                    data-cursor="hover"
                    data-cursor-label="Open"
                  >
                    <div className="gh__repo-head">
                      <span className="gh__repo-dot" />
                      <span className="gh__repo-name font-mono">{r.name}</span>
                    </div>
                    <div className="gh__repo-meta">
                      <span>
                        <Star size={12} aria-hidden /> {r.stars}
                      </span>
                      <span>
                        <GitFork size={12} aria-hidden /> {r.forks}
                      </span>
                      <span className="gh__repo-lang font-mono">
                        {r.language}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div className="gh__contributions" variants={fadeUp}>
              <div className="gh__sub-head">
                <span className="eyebrow">Contribution calendar</span>
                <span className="gh__contributions-count font-mono">
                  {githubStats.contributions} contributions in the last year
                </span>
              </div>
              <ContributionGraph />
            </motion.div>
          </div>

          {/* Right column — language usage + achievements */}
          <div className="gh__col gh__col--side">
            <motion.div className="gh__langs" variants={fadeUp}>
              <span className="eyebrow">Languages used</span>
              <div className="gh__lang-bar" aria-hidden="true">
                {githubStats.languages.map((l) => (
                  <span
                    key={l.name}
                    style={{ width: `${l.pct}%`, background: l.color }}
                  />
                ))}
              </div>
              <ul className="gh__lang-list">
                {githubStats.languages.map((l) => (
                  <li key={l.name}>
                    <span
                      className="gh__lang-dot"
                      style={{ background: l.color }}
                    />
                    <span className="gh__lang-name">{l.name}</span>
                    <span className="gh__lang-pct font-mono">{l.pct}%</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div className="gh__achievements" variants={fadeUp}>
              <span className="eyebrow">Achievements</span>
              <ul className="gh__badges">
                {githubStats.achievements.map((a) => (
                  <li key={a.label} className="gh__badge" data-cursor="hover">
                    <span className="gh__badge-icon">{a.icon}</span>
                    <span className="gh__badge-label font-mono">{a.label}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Availability footer line */}
        <motion.div
          className="gh__availability"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <span className="gh__avail-dot" />
          For deeper collaboration, see the contact section — {profile.name}.
        </motion.div>
      </div>
    </section>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType;
  value: number;
  label: string;
}) {
  return (
    <motion.div className="gh__stat" variants={fadeUp}>
      <Icon size={16} aria-hidden />
      <span className="gh__stat-num font-display">{value}</span>
      <span className="gh__stat-label">{label}</span>
    </motion.div>
  );
}

/** 52w x 7d heatmap backed by the placeholder contributionGraph array. */
function ContributionGraph() {
  const weeks = 52;
  const days = 7;
  const cells = githubStats.contributionGraph;
  // 0..4 -> opacity scale
  const levelOpacity = ["0.08", "0.25", "0.5", "0.75", "1"];

  return (
    <div
      className="gh__heatmap"
      role="img"
      aria-label="GitHub contribution heatmap"
    >
      {Array.from({ length: weeks }, (_, w) => (
        <div key={w} className="gh__heatmap-col">
          {Array.from({ length: days }, (_, d) => {
            const idx = w * days + d;
            const lvl = Math.min(4, Math.max(0, cells[idx] ?? 0));
            return (
              <span
                key={d}
                className="gh__heatmap-cell"
                style={{ opacity: levelOpacity[lvl] }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
