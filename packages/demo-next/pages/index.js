/**

Copyright 2019 Forestry.io Inc

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

import matter from "gray-matter";
import { useLocalMarkdownForm } from 'next-tinacms-markdown';

import Layout from "../components/Layout";
import BlogList from "../components/BlogList";


export default function Index(props) {
  const formOptions = {
    label: 'Home Page',
    fields: [
      { label:"Name",
        name:"frontmatter.name",
        component: "text"
      },
        {
        name: 'markdownBody',
        label: 'Home Page Content',
        component: 'markdown',
      },
    ]
  }
  const [data] = useLocalMarkdownForm(props.data, formOptions)

  console.log("data", data)
  return (
    <Layout 
      pathname="/" 
      siteTitle={props.title} 
      siteDescription={props.description}
    >
      <section>
        <BlogList data={data} />
      </section>
    </Layout>
  );
};

Index.getInitialProps = async function() {
  const configData = await import(`../data/config.json`)
  const indexData = await import(`../data/index.md`)
  const data = matter(indexData.default)

  return {
    title: configData.title,
    description: configData.description,
    data: {
      fileRelativePath: `data/index.md`,
      frontmatter: data.data,
      markdownBody: data.content
    }
  }
}