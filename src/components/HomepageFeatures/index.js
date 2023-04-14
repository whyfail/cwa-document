import React from "react"
import clsx from "clsx"
import styles from "./styles.module.css"

const FeatureList = [
  {
    title: "使用简单",
    Svg: require("@site/static/img/undraw_code.svg").default,
    description: <>在线上验证过，完善配置，快速构建模板，方便实用。无需繁琐配置，专注业务开发，提高效率。</>,
  },
  {
    title: "专注于重要的事情",
    Svg: require("@site/static/img/undraw_vue.svg").default,
    description: <>无需底层配置，专注业务逻辑。脚手架处理完善，快速开发，提高效率，专注核心业务。</>,
  },
  {
    title: "支持React、Vue3",
    Svg: require("@site/static/img/undraw_react.svg").default,
    description: <>提供React和Vue3模板，含全家桶配置。根据需求选择模板，快速搭建项目，专注业务开发。</>,
  },
]

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
