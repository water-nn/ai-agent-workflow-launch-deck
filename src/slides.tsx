import type { Slide } from './deck/types'
import { BarChartBlock, DataTableBlock, DonutChartBlock, HorizontalBarBlock, LineChartBlock, MetricCard } from './deck/charts'
import { FlowNode, GlassCard, Pill, SlideHeader, StageLine } from './deck/layouts/SlideBlocks'

const slideMeta = [
  { id: 'cover', title: 'AI Agent 工作流发布会', navTitle: '封面', section: 'Opening', kind: 'cover' },
  { id: 'agenda', title: 'Agenda', navTitle: '目录', section: 'Opening', kind: 'agenda' },
  { id: 'statement', title: '从会聊天到会交付', navTitle: '核心观点', section: 'Thesis', kind: 'statement' },
  { id: 'problem', title: '为什么传统工作流变慢了', navTitle: '问题背景', section: 'Context', kind: 'matrix' },
  { id: 'levels', title: 'Agent 工作流的三个层级', navTitle: '三个层级', section: 'System', kind: 'split' },
  { id: 'architecture', title: '一套可执行系统，而不是一个输入框', navTitle: '系统架构', section: 'System', kind: 'architecture' },
  { id: 'tools', title: '工具生态：Agent 的外部器官', navTitle: '工具生态', section: 'System', kind: 'matrix' },
  { id: 'workflow', title: '一个完整任务如何流动', navTitle: '工作流示例', section: 'Workflow', kind: 'timeline' },
  { id: 'collaboration', title: '人机协作：把判断和执行分层', navTitle: '人机分工', section: 'Workflow', kind: 'matrix' },
  { id: 'efficiency', title: '数据叙事 A：效率不是快一点，而是少折返', navTitle: '效率变化', section: 'Data Story', kind: 'data' },
  { id: 'coverage', title: '数据叙事 B：任务覆盖从单点走向链路', navTitle: '任务覆盖', section: 'Data Story', kind: 'data' },
  { id: 'deck-skill', title: 'HTML PPT 本身也是一个 Agent Skill 案例', navTitle: 'Deck Skill', section: 'Capability', kind: 'split' },
  { id: 'risk', title: '风险与边界：自动化之前先定义刹车', navTitle: '风险边界', section: 'Governance', kind: 'matrix' },
  { id: 'quality', title: '质量控制体系：让输出可验证、可回滚', navTitle: '质量控制', section: 'Governance', kind: 'timeline' },
  { id: 'roadmap', title: '路线图：从单点任务到半自动化系统', navTitle: '路线图', section: 'Roadmap', kind: 'roadmap' },
  { id: 'decision', title: '发布后要固化的五个标准', navTitle: '决策页', section: 'Decision', kind: 'decision' },
  { id: 'closing', title: 'The next interface is not a chat box.', navTitle: '结尾', section: 'Closing', kind: 'closing' },
] as const

const agendaItems = slideMeta.slice(2).map((slide, index) => ({
  number: String(index + 3).padStart(2, '0'),
  title: slide.navTitle,
  section: slide.section,
}))

const problemItems = [
  ['信息分散', '资料散落在网页、聊天、文件与任务系统中。'],
  ['工具割裂', '搜索、编辑、构建、部署各自独立，交接成本高。'],
  ['复制粘贴', '人把上下文搬来搬去，重复动作吞掉注意力。'],
  ['文档脱节', '文档写完不等于执行完成，进度难以闭环。'],
  ['反馈周期长', '检查、修正、发布、复盘之间缺少自动回路。'],
]

const toolItems = ['Web 搜索', '文件读取', '代码执行', 'GitHub / Codex', 'Gmail / Calendar', '图片生成', '文档 / 表格 / PPT', '自动化任务']

export const slides: Slide[] = [
  {
    ...slideMeta[0],
    content: (
      <div className="cover-layout">
        <div className="cover-kicker">Product Launch Deck · 2026</div>
        <h1>AI Agent 工作流发布会</h1>
        <p>从工具调用到自动化协作系统</p>
        <div className="cover-orbit">
          <span />
          <span />
          <span />
        </div>
        <div className="cover-meta">
          <Pill>Workflow</Pill>
          <Pill>Automation</Pill>
          <Pill>Human-in-the-loop</Pill>
        </div>
      </div>
    ),
  },
  {
    ...slideMeta[1],
    content: (
      <div className="agenda-layout">
        <SlideHeader eyebrow="Agenda" title="一场从问题到交付系统的演示">
          目录与左侧 hover 导航使用同一份 slides 数据源生成。
        </SlideHeader>
        <div className="agenda-grid">
          {agendaItems.map((item) => (
            <button className="agenda-card" type="button" key={`${item.number}-${item.title}`}>
              <span>{item.number}</span>
              <strong>{item.title}</strong>
              <em>{item.section}</em>
            </button>
          ))}
        </div>
      </div>
    ),
  },
  {
    ...slideMeta[2],
    content: (
      <div className="statement-layout">
        <span className="statement-label">Big Statement</span>
        <h1>
          AI Agent 的价值，不是“会聊天”，而是能把工具、文件、网页、代码和决策流程连接成一套可执行系统。
        </h1>
        <div className="statement-foot">
          <Pill>连接上下文</Pill>
          <Pill>调用工具</Pill>
          <Pill>验证结果</Pill>
          <Pill>交付产物</Pill>
        </div>
      </div>
    ),
  },
  {
    ...slideMeta[3],
    content: (
      <div className="matrix-layout">
        <SlideHeader eyebrow="Problem Matrix" title="传统工作流慢，常常不是因为人慢">
          真正的瓶颈在于上下文无法自动穿过工具边界。
        </SlideHeader>
        <div className="problem-matrix">
          {problemItems.map(([title, detail], index) => (
            <GlassCard className="problem-card" key={title}>
              <span>0{index + 1}</span>
              <strong>{title}</strong>
              <p>{detail}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    ),
  },
  {
    ...slideMeta[4],
    content: (
      <div className="levels-layout">
        <SlideHeader eyebrow="Three Levels" title="从助手，到调用者，再到协作者" />
        <div className="level-stack">
          <GlassCard className="level-card level-card-low">
            <span>Level 01</span>
            <strong>对话助手</strong>
            <p>回答问题、整理文本、生成建议。价值在表达层。</p>
          </GlassCard>
          <GlassCard className="level-card level-card-mid">
            <span>Level 02</span>
            <strong>工具调用者</strong>
            <p>能搜索、读文件、运行代码、生成文件。价值进入执行层。</p>
          </GlassCard>
          <GlassCard className="level-card level-card-high">
            <span>Level 03</span>
            <strong>自动化协作者</strong>
            <p>能拆解任务、串联工具、校验结果、持续交付。价值进入系统层。</p>
          </GlassCard>
        </div>
      </div>
    ),
  },
  {
    ...slideMeta[5],
    content: (
      <div className="architecture-layout">
        <SlideHeader eyebrow="System Architecture" title="Agent 工作流架构：输入的是意图，输出的是交付物" />
        <div className="architecture-map">
          <div className="arch-node arch-user">用户意图</div>
          <div className="arch-node arch-context">上下文</div>
          <div className="arch-core">Agent Orchestrator</div>
          {['工具调用', '文件处理', '代码执行', '外部服务', '结果验证', '交付物'].map((item) => (
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
      <div className="tools-layout">
        <SlideHeader eyebrow="Tool Ecosystem" title="Agent 的能力半径，由工具生态决定" />
        <div className="tool-map">
          <div className="tool-core">Agent</div>
          {toolItems.map((item, index) => (
            <button className={`tool-node tool-node-${index}`} type="button" key={item}>
              {item}
            </button>
          ))}
        </div>
      </div>
    ),
  },
  {
    ...slideMeta[7],
    content: (
      <div className="timeline-layout">
        <SlideHeader eyebrow="Workflow Example" title="把一个需求推进到交付，需要一条可复用的链路" />
        <StageLine>
          {[
            ['01', '需求', '明确目标与约束'],
            ['02', '拆解', '生成任务图谱'],
            ['03', '搜索', '补全事实依据'],
            ['04', '生成', '产出文档或代码'],
            ['05', '验证', '构建、测试、检查'],
            ['06', '部署', '发布到可访问位置'],
            ['07', '复盘', '回写经验与标准'],
          ].map(([index, title, detail]) => (
            <FlowNode index={index} title={title} detail={detail} key={title} />
          ))}
        </StageLine>
      </div>
    ),
  },
  {
    ...slideMeta[8],
    content: (
      <div className="collab-layout">
        <SlideHeader eyebrow="Human × Agent" title="把人留在判断层，把 Agent 放进执行层" />
        <div className="collab-matrix">
          <GlassCard>
            <h2>人负责</h2>
            {['目标', '判断', '审美', '取舍', '最终确认'].map((item) => (
              <Pill key={item}>{item}</Pill>
            ))}
          </GlassCard>
          <GlassCard className="collab-center">
            <strong>共同完成</strong>
            <p>人给方向，Agent 执行链路；人做选择，Agent 负责把选择落成产物。</p>
          </GlassCard>
          <GlassCard>
            <h2>Agent 负责</h2>
            {['执行', '搜索', '整理', '生成', '检查', '部署'].map((item) => (
              <Pill key={item}>{item}</Pill>
            ))}
          </GlassCard>
        </div>
      </div>
    ),
  },
  {
    ...slideMeta[9],
    content: (
      <div className="data-layout">
        <SlideHeader eyebrow="Data Story A" title="示例数据：Agent 工作流减少的是来回切换" />
        <div className="data-grid">
          <BarChartBlock
            title="传统流程 vs Agent 工作流"
            data={[
              { label: '总耗时', traditional: 100, agent: 46, unit: '%' },
              { label: '重复操作', traditional: 88, agent: 28, unit: '%' },
              { label: '返工次数', traditional: 64, agent: 31, unit: '%' },
            ]}
          />
          <div className="metric-column">
            <MetricCard label="Delivery Speed" value="2.1×" detail="示例：同等任务链路下更快交付" tone="gold" />
            <MetricCard label="Context Loss" value="-58%" detail="减少跨工具搬运造成的信息丢失" tone="cyan" />
          </div>
        </div>
      </div>
    ),
  },
  {
    ...slideMeta[10],
    content: (
      <div className="data-layout">
        <SlideHeader eyebrow="Data Story B" title="覆盖范围从“写一段话”扩展到“完成一条链路”" />
        <div className="coverage-grid">
          <HorizontalBarBlock
            title="典型任务覆盖潜力"
            data={[
              { label: '写作', value: 92 },
              { label: '代码', value: 86 },
              { label: '资料整理', value: 88 },
              { label: '图像', value: 74 },
              { label: '文档', value: 84 },
              { label: '部署', value: 76 },
              { label: '日程', value: 68 },
              { label: '邮件', value: 64 },
            ]}
          />
          <DonutChartBlock
            title="能力域组成"
            data={[
              { label: '内容', value: 24, color: '#d7b46a' },
              { label: '代码', value: 18, color: '#77c7c2' },
              { label: '文件', value: 16, color: '#9ea7b8' },
              { label: '发布', value: 14, color: '#7dbb86' },
              { label: '协作', value: 12, color: '#b6a28a' },
              { label: '验证', value: 16, color: '#e2d6c4' },
            ]}
          />
        </div>
      </div>
    ),
  },
  {
    ...slideMeta[11],
    content: (
      <div className="skill-layout">
        <SlideHeader eyebrow="Skill Case" title="这套网页式 PPT，就是 Agent Skill 的一个真实产物" />
        <div className="capability-ring">
          {['16:9 舞台', 'hover 导航', '动态背景', '键盘翻页', '图表组件', '本地预览', 'GitHub Pages', '持续迭代'].map((item) => (
            <GlassCard className="capability-card" key={item}>
              <strong>{item}</strong>
            </GlassCard>
          ))}
        </div>
      </div>
    ),
  },
  {
    ...slideMeta[12],
    content: (
      <div className="risk-layout">
        <SlideHeader eyebrow="Risk Boundary" title="越接近自动化，越需要清楚边界" />
        <div className="risk-grid">
          {['幻觉', '权限问题', '数据安全', '误操作', '审美不足', '自动化过度', '验证缺失'].map((item, index) => (
            <GlassCard className="risk-card" key={item}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{item}</strong>
              <p>{index < 3 ? '需要事实、权限与边界检查。' : '需要人类判断与可回滚机制。'}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    ),
  },
  {
    ...slideMeta[13],
    content: (
      <div className="quality-layout">
        <SlideHeader eyebrow="Quality System" title="质量不是最后检查一次，而是每一步都有闸门" />
        <div className="quality-grid">
          <DataTableBlock
            title="发布前控制点"
            columns={['阶段', '检查项', '输出']}
            rows={[
              ['Build', '类型与构建', '可运行版本'],
              ['视觉 QA', '视口 / 溢出 / 动效', '演示级画面'],
              ['事实核查', '来源与表述', '可信内容'],
              ['权限检查', '敏感文件 / token', '安全边界'],
              ['用户确认', '目标和取舍', '最终决策'],
              ['版本回滚', '提交 / 记录', '可恢复状态'],
            ]}
          />
          <LineChartBlock
            title="质量闸门通过率"
            points={[
              { label: '草稿', value: 42 },
              { label: '构建', value: 66 },
              { label: '视觉', value: 78 },
              { label: '事实', value: 84 },
              { label: '发布', value: 92 },
            ]}
          />
        </div>
      </div>
    ),
  },
  {
    ...slideMeta[14],
    content: (
      <div className="roadmap-layout">
        <SlideHeader eyebrow="Roadmap" title="从单点能力，走向项目级工作流" />
        <div className="roadmap">
          {[
            ['Phase 01', '单点任务', '搜索、写作、整理、生成。'],
            ['Phase 02', '多工具协作', '文件、网页、代码、服务被串联。'],
            ['Phase 03', '项目级工作流', '标准化交付、质量门禁、复盘回写。'],
            ['Phase 04', '半自动化操作系统', '人定义目标，系统推进执行。'],
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
    ...slideMeta[15],
    content: (
      <div className="decision-layout">
        <SlideHeader eyebrow="Decision" title="发布之后，要把经验写成可复用标准" />
        <div className="decision-grid">
          {['任务提示词模板', 'Skill 回写机制', 'GitHub Pages 发布流程', '视觉 QA 标准', '讲者模式预留'].map((item, index) => (
            <GlassCard className="decision-card" key={item}>
              <span>Decision {index + 1}</span>
              <strong>{item}</strong>
              <p>把一次成功交付沉淀为下一次默认能力。</p>
            </GlassCard>
          ))}
        </div>
      </div>
    ),
  },
  {
    ...slideMeta[16],
    content: (
      <div className="closing-layout">
        <span className="closing-kicker">Closing Statement</span>
        <h1>The next interface is not a chat box.</h1>
        <h2>It is a workflow.</h2>
        <p>AI Agent 工作流，把想法推进到交付。</p>
      </div>
    ),
  },
].map((slide) => ({ ...slide, kind: slide.kind as Slide['kind'] }))
