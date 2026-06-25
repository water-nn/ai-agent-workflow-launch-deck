import type { Slide } from './deck/types'
import { BarChartBlock, DataTableBlock, LineChartBlock, MetricCard } from './deck/charts'
import { MediaImage, MediaVideo } from './deck/media/MediaPreview'
import { FlowNode, GlassCard, Pill, ScrollableCard, SlideHeader, StageLine } from './deck/layouts/SlideBlocks'

const slideMeta = [
  { id: 'cover', title: 'AI Agent 工作流发布会', navTitle: '封面', section: 'Opening', kind: 'cover' },
  { id: 'agenda', title: 'Agenda', navTitle: '目录', section: 'Opening', kind: 'agenda' },
  { id: 'problem', title: '第一幕：重复解释正在拖慢交付', navTitle: '第一幕：问题', section: 'Act I · Problem', kind: 'matrix' },
  { id: 'cost', title: '每次从零开始，都会丢掉一部分项目记忆', navTitle: '上下文损耗', section: 'Act I · Problem', kind: 'data' },
  { id: 'turning-point', title: '第二幕：Agent Skill 把经验沉淀成能力包', navTitle: '第二幕：转折', section: 'Act II · Skill', kind: 'statement' },
  { id: 'skill-architecture', title: 'Agent Skill 扩展 Codex 的方式，是补上工作流记忆', navTitle: 'Skill 架构', section: 'Act II · Skill', kind: 'architecture' },
  { id: 'workflow', title: 'Skill 让一次性任务变成可复用工作流', navTitle: '可复用链路', section: 'Act II · Skill', kind: 'timeline' },
  { id: 'case', title: '第三幕：html-presentation-deck 是一个典型案例', navTitle: '第三幕：案例', section: 'Act III · Case', kind: 'split' },
  { id: 'deck-system', title: '它把“做 HTML PPT”固化为一套演示生产系统', navTitle: 'Deck 能力', section: 'Act III · Case', kind: 'data' },
  { id: 'cross-device', title: '第四幕：GitHub 让不同设备上的 Codex 接续同一个项目', navTitle: '第四幕：系统化', section: 'Act IV · System', kind: 'architecture' },
  { id: 'handoff', title: 'PROJECT_STATUS.md 是跨设备协作的交接契约', navTitle: '项目交接', section: 'Act IV · System', kind: 'data' },
  { id: 'design-qa', title: '第五幕：Design QA 让它从“能运行”变成“像发布会”', navTitle: '第五幕：升级', section: 'Act V · Upgrade', kind: 'matrix' },
  { id: 'theme-boundary', title: '默认版必须稳定，visual / aurora 只是实验增强版', navTitle: '主题边界', section: 'Act V · Upgrade', kind: 'decision' },
  { id: 'roadmap', title: '未来：把 HTML PPT skill 升级成稳定生产系统', navTitle: '第六幕：路线图', section: 'Act VI · Future', kind: 'roadmap' },
  { id: 'closing', title: 'Agent Skill 的价值，是把 Codex 推向自动化协作系统', navTitle: '结论', section: 'Closing', kind: 'closing' },
] as const

const actItems = [
  ['01', '问题', '重复沟通、上下文丢失、多设备接续困难。'],
  ['02', '转折', 'Agent Skill 把经验沉淀成可安装、可同步、可迭代的能力包。'],
  ['03', '案例', 'html-presentation-deck 把网页式 PPT 生产流程固化下来。'],
  ['04', '系统化', 'GitHub、Pages 与 PROJECT_STATUS.md 让项目跨设备延续。'],
  ['05', '升级', 'ui-ux-pro-max 与 frontend-design 作为 companion skills 做 Design QA。'],
  ['06', '结论', 'Codex 从一次性任务执行，走向可复用的自动化协作系统。'],
]

const problemItems = [
  ['重复沟通', '每次都要重新解释规则、项目背景、部署方式和视觉标准。'],
  ['上下文丢失', '换设备、换线程、换任务后，关键取舍很容易断开。'],
  ['协作困难', 'Mac 与 Windows 上的 Codex 如果没有共同仓库，只能各自为战。'],
  ['质量漂移', '页面越做越像组件测试，默认主题被实验视觉反向污染。'],
  ['交付不可复用', '一次成功交付没有沉淀成下一次的默认能力。'],
]

const mediaBase = '/ai-agent-workflow-launch-deck/media/'
const mediaImageSrc = `${mediaBase}agent-workflow-inspection.svg`
const mediaVideoPoster = `${mediaBase}agent-workflow-video-poster.svg`
const mediaVideoSrc = `${mediaBase}agent-workflow-demo.webm`

const longHandoffText = `02｜上下文交接与状态记录

当一个 Agent 工作流跨越多次会话、多台设备或多个执行阶段时，最容易丢失的不是代码本身，而是“为什么这样做”的过程信息。为了让 Codex 能够稳定接续工作，每一次关键修改都应该留下可读的状态记录：当前目标是什么、已经完成了什么、哪些方案被否定、哪些问题还没有解决、下一步应该从哪里开始、哪些文件不能随意覆盖、哪些视觉判断需要人工复查。

在 HTML PPT 项目中，这类状态记录尤其重要。因为它不仅包含代码状态，也包含视觉标准、交互原则、部署方式、审美偏好和跨设备协作规则。如果没有 PROJECT_STATUS.md，另一台电脑上的 Codex 很可能只看到当前代码，却不知道前面为什么要从黑金改成 agent-lab，为什么 pinned Agenda 不能整体缩放，为什么媒体内容必须支持 lightbox，为什么页面级不能滚动而卡片内部可以滚动。

因此，状态记录不是额外文档，而是 Agent Skill 工作流的一部分。它让一次性的任务变成可接续的系统，让每次修改都有上下文，让未来的 Codex 不需要从零理解项目，也能继续沿着正确方向工作。每次完成修改后，都应该同步更新 PROJECT_STATUS.md，并和代码一起 commit / push。这样无论是在家里的 Mac，还是公司的 Windows 电脑，都可以通过 git pull、阅读状态文件、运行 build，然后继续同一个工作流。`

export const slides: Slide[] = [
  {
    ...slideMeta[0],
    content: (
      <div className="cover-layout">
        <div className="cover-kicker">Original Agent Skill Lab Palette</div>
        <h1>AI Agent 工作流发布会</h1>
        <p>从工具调用到自动化协作系统</p>
        <div className="cover-orbit">
          <span />
          <span />
          <span />
        </div>
        <div className="cover-meta">
          <Pill>Agent Skill</Pill>
          <Pill>Reusable Workflow</Pill>
          <Pill>Cross-device Codex</Pill>
        </div>
      </div>
    ),
  },
  {
    ...slideMeta[1],
    content: (
      <div className="agenda-layout">
        <SlideHeader eyebrow="Six-act narrative" title="今天讲的不是一个工具，而是一套协作系统">
          从重复沟通的问题出发，走到可安装、可同步、可审美迭代的 Agent Skill 工作流。
        </SlideHeader>
        <div className="agenda-grid act-agenda-grid">
          {actItems.map(([number, title, detail]) => (
            <button className="agenda-card act-agenda-card" type="button" key={number}>
              <span>{number}</span>
              <strong>{title}</strong>
              <em>{detail}</em>
            </button>
          ))}
        </div>
      </div>
    ),
  },
  {
    ...slideMeta[2],
    content: (
      <div className="matrix-layout">
        <SlideHeader eyebrow="Act I · Problem" title="Codex 很强，但项目不该每次都重新开场">
          真正的损耗不是执行速度，而是规则、背景、部署和视觉标准无法自动延续。
        </SlideHeader>
        <div className="problem-matrix">
          {problemItems.map(([title, detail], index) => (
            <GlassCard className="problem-card" key={title}>
              <span>Issue {String(index + 1).padStart(2, '0')}</span>
              <strong>{title}</strong>
              <p>{detail}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    ),
  },
  {
    ...slideMeta[3],
    content: (
      <div className="data-layout">
        <SlideHeader eyebrow="Context loss" title="一次性提示词越多，跨任务折返越多" />
        <div className="data-grid">
          <BarChartBlock
            title="把经验写进 Skill 后，重复解释显著下降"
            data={[
              { label: '背景重讲', traditional: 100, agent: 28, unit: '%' },
              { label: '流程重建', traditional: 86, agent: 34, unit: '%' },
              { label: '视觉回正', traditional: 78, agent: 42, unit: '%' },
            ]}
          />
          <div className="metric-column">
            <MetricCard label="Reusable memory" value="1×" detail="同一套规则进入 skill，而不是留在一次聊天里。" tone="cyan" />
            <MetricCard label="Handoff loss" value="-64%" detail="用仓库和状态文件接住跨设备交接。" tone="slate" />
          </div>
        </div>
      </div>
    ),
  },
  {
    ...slideMeta[4],
    content: (
      <div className="statement-layout">
        <span className="statement-label">Act II · Turning point</span>
        <h1>Agent Skill 不是一次性提示词。它是可安装、可同步、可迭代的工作流能力包。</h1>
        <div className="statement-foot">
          <Pill>规则沉淀</Pill>
          <Pill>工具编排</Pill>
          <Pill>项目记忆</Pill>
          <Pill>质量门禁</Pill>
        </div>
      </div>
    ),
  },
  {
    ...slideMeta[5],
    content: (
      <div className="architecture-layout">
        <SlideHeader eyebrow="Skill architecture" title="Skill 把 Codex 的执行力接到一条可复用链路上" />
        <div className="architecture-map skill-architecture-map">
          <div className="arch-node arch-user">用户目标</div>
          <div className="arch-node arch-context">项目上下文</div>
          <div className="arch-core">Agent Skill</div>
          {['SKILL.md 规则', '参考文档', '脚本模板', '验证清单', '交付约定', '复盘回写'].map((item) => (
            <div className="arch-node" key={item}>
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    ...slideMeta[6],
    content: (
      <div className="timeline-layout">
        <SlideHeader eyebrow="Reusable workflow" title="一次任务完成后，经验应该回到系统里" />
        <StageLine>
          {[
            ['01', '明确目标', '主题、边界、受众'],
            ['02', '读取 skill', '规则和参考资料'],
            ['03', '生成项目', '结构、内容、交互'],
            ['04', '视觉回正', '默认主题和图表统一'],
            ['05', '验证构建', '浏览器与生产输出'],
            ['06', '部署同步', 'GitHub Pages'],
            ['07', '状态交接', 'PROJECT_STATUS.md'],
          ].map(([index, title, detail]) => (
            <FlowNode index={index} title={title} detail={detail} key={title} />
          ))}
        </StageLine>
      </div>
    ),
  },
  {
    ...slideMeta[7],
    content: (
      <div className="collab-layout">
        <SlideHeader eyebrow="Act III · Case" title="html-presentation-deck 把一个反复需求变成默认能力" />
        <div className="collab-matrix case-matrix">
          <GlassCard>
            <h2>过去</h2>
            {['解释栈选型', '重讲 16:9 舞台', '补充翻页需求', '手动写部署说明'].map((item) => (
              <Pill key={item}>{item}</Pill>
            ))}
          </GlassCard>
          <GlassCard className="collab-center">
            <strong>Skill 化</strong>
            <p>把项目生成、演示控件、视觉基线、部署和交接规则写成稳定流程。</p>
          </GlassCard>
          <GlassCard>
            <h2>现在</h2>
            {['React / Vite', '键盘翻页', 'Agenda', '动态背景', 'GitHub Pages', '本地预览'].map((item) => (
              <Pill key={item}>{item}</Pill>
            ))}
          </GlassCard>
        </div>
      </div>
    ),
  },
  {
    ...slideMeta[8],
    content: (
      <div className="media-lab-layout">
        <SlideHeader
          eyebrow="Deck media lab"
          title="媒体内容不是嵌进去就结束，而是要能检查、放大和播放"
        >
          图片和视频都在演示舞台内保持比例；进入 lightbox / modal 后，方向键不会误触发翻页。
        </SlideHeader>
        <div className="media-lab-grid">
          <MediaImage
            title="Image inspection"
            caption="左侧示例用于截图、架构图或设计稿：卡片内等比 contain，点击后居中放大检查细节。"
            alt="AI Agent workflow screenshot showing agenda, presentation stage and delivery cards"
            src={mediaImageSrc}
          />
          <MediaVideo
            title="Workflow recording"
            caption="右侧示例用于产品录屏或交互视频：可播放、暂停、拖动进度、调节音量，并放大到 modal。"
            src={mediaVideoSrc}
            poster={mediaVideoPoster}
          />
        </div>
        <div className="media-lab-notes" aria-label="媒体能力检查点">
          {['图片可点开 lightbox', '视频默认不自动播放', '弹层打开时阻止翻页', '关闭 modal 后视频暂停'].map((item) => (
            <Pill key={item}>{item}</Pill>
          ))}
        </div>
      </div>
    ),
  },
  {
    ...slideMeta[9],
    content: (
      <div className="architecture-layout">
        <SlideHeader eyebrow="Act IV · System" title="GitHub 把本地 Codex 工作变成可接续项目" />
        <div className="architecture-map cross-device-map">
          <div className="arch-node arch-user">Mac Codex</div>
          <div className="arch-node arch-context">Windows Codex</div>
          <div className="arch-core">GitHub Repository</div>
          {['source code', 'PROJECT_STATUS.md', 'GitHub Actions', 'GitHub Pages', 'REMOTE_URL.txt', 'README / docs'].map(
            (item) => (
              <div className="arch-node" key={item}>
                {item}
              </div>
            ),
          )}
        </div>
      </div>
    ),
  },
  {
    ...slideMeta[10],
    content: (
      <div className="quality-layout">
        <SlideHeader eyebrow="Project handoff" title="状态文件要回答：做到哪里、怎么继续、哪些不能破坏" />
        <div className="quality-grid">
          <DataTableBlock
            title="PROJECT_STATUS.md 建议记录的四类信息"
            columns={['模块', '写什么', '作用']}
            rows={[
              ['当前主题', 'AI Agent 工作流发布会', '避免后续偏成泛技术文档'],
              ['稳定链接', 'GitHub Pages URL', '让设备共享同一预览入口'],
              ['默认基线', 'agent-lab palette', '保护旧项目母版里的 cyan / violet 深色科技感'],
              ['下一步', '待验证、待部署、待设计 QA', '让 Codex 接手即可继续'],
            ]}
          />
          <LineChartBlock
            title="交接清晰度随着仓库化逐步提升"
            points={[
              { label: '聊天', value: 35 },
              { label: '本地', value: 48 },
              { label: '仓库', value: 72 },
              { label: '状态', value: 86 },
              { label: 'Pages', value: 94 },
            ]}
          />
        </div>
      </div>
    ),
  },
  {
    ...slideMeta[11],
    content: (
      <div className="scroll-lab-layout">
        <SlideHeader eyebrow="Act V · Upgrade" title="工作流信息有长有短，版式仍然要稳定">
          四张卡片保持同高；只有内容溢出的第 2 张卡片内部滚动，整页不滚动，也不整体缩放。
        </SlideHeader>
        <div className="scroll-card-grid">
          <ScrollableCard className="scroll-lab-card" label="01｜视觉基准" title="默认主题要像发布会">
            <p>agent-lab 默认版继续使用 deep navy / blue black、cyan / teal 和 muted violet 的空间光，服务正式远程链接。</p>
          </ScrollableCard>
          <ScrollableCard className="scroll-lab-card scroll-lab-card-long" label="02｜上下文交接与状态记录" title="跨设备接续必须留下过程">
            {longHandoffText.split('\n\n').map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </ScrollableCard>
          <ScrollableCard className="scroll-lab-card" label="03｜媒体检查" title="图片和视频都要可验证">
            <p>截图、设计稿和产品录屏不能只是嵌进去，需要支持放大、播放、暂停、关闭暂停和弹层优先级。</p>
          </ScrollableCard>
          <ScrollableCard className="scroll-lab-card" label="04｜Design QA" title="辅助 skill 做审美复查">
            <p>ui-ux-pro-max 与 frontend-design 参与检查信息架构、视觉层级、间距、交互状态和演讲场景可读性。</p>
          </ScrollableCard>
        </div>
      </div>
    ),
  },
  {
    ...slideMeta[12],
    content: (
      <div className="decision-layout">
        <SlideHeader eyebrow="Theme boundary" title="正式默认版只做一件事：稳定、统一、可演讲" />
        <div className="decision-grid theme-boundary-grid">
          {[
            ['Default', '深 navy / blue black 背景，cyan / teal 主强调，muted violet / indigo 形成空间光。'],
            ['Cards', '同一边框、同一透明度、同一 hover 反馈。'],
            ['Charts', '图表只服务观点，不把页面做成 dashboard。'],
            ['Motion', '背景克制，动效只强化层级与进入节奏。'],
            ['Experiments', 'champagne / aurora 作为增强版，不反向影响默认链接。'],
          ].map(([title, detail]) => (
            <GlassCard className="decision-card" key={title}>
              <span>{title}</span>
              <strong>{title}</strong>
              <p>{detail}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    ),
  },
  {
    ...slideMeta[13],
    content: (
      <div className="roadmap-layout">
        <SlideHeader eyebrow="Act VI · Future" title="下一步不是增加花样，而是让生产系统更稳定" />
        <div className="roadmap">
          {[
            ['Phase 01', '内容结构化', '把主题、章节、页面观点和图表数据沉淀为更清晰的内容模型。'],
            ['Phase 02', '视觉基线库', '默认 agent-lab palette、实验 champagne / aurora、Design QA 检查表独立维护。'],
            ['Phase 03', '导出与部署', '强化 PDF、GitHub Pages、离线预览与多设备交接的一致体验。'],
            ['Phase 04', '生产系统', '从生成一套 PPT，升级为持续迭代的网页式演示文稿流水线。'],
          ].map(([phase, title, detail]) => (
            <GlassCard className="roadmap-card" key={phase}>
              <span>{phase}</span>
              <strong>{title}</strong>
              <p>{detail}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    ),
  },
  {
    ...slideMeta[14],
    content: (
      <div className="closing-layout">
        <span className="closing-kicker">Closing statement</span>
        <h1>Agent Skill 的价值不是多一个工具。</h1>
        <h2>是让 Codex 进入可复用、可协作、可审美迭代的自动化工作系统。</h2>
        <p>默认链接：water-nn.github.io/ai-agent-workflow-launch-deck</p>
      </div>
    ),
  },
].map((slide) => ({ ...slide, kind: slide.kind as Slide['kind'] }))
