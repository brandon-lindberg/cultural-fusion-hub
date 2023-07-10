import Link from 'next/link';
import Layout from '../components/Layout';
import ProfileCard from '../components/ProfileCard';

const AboutPage = () => (
  <Layout title="About">
    <div>
      <div className="p-5 text-center text-justify">
        <article>
          私たちの子供たちは異なる文化や背景を持ち、それが彼らの一部となっています。このコミュニティを通じて、子供たちが自身のアイデンティティを誇りに思い、他の子供たちや家族とつながり、共有することができるように願っています。
          私たちの目標は、このコミュニティを通じて子供たちが居場所を見つけ、互いに理解し合い、共に成長していくことです。また、より広い社会全体が多様性を受け入れる社会になるための一助になればと考えています。
        </article>
      </div>
      <div className="profile m-3">
        <ProfileCard
          name="Obikane Yuka"
          image="/profile_one.jpg"
          position="Founder"
          description="I am Yuka and this is my description"
          instagram="https://www.instagram.com/culturalfusionhub/"
          // twitter="https://twitter.com/"
          // linkedin="https://www.linkedin.com/"
          // facebook="https://www.facebook.com/"
        />
      </div>
      <div className="profile m-3">
        <ProfileCard
          name="Saho Petersen"
          image="/profile_two.jpg"
          position="Founder"
          description="I am Saho and this is my description"
          instagram="https://www.instagram.com/culturalfusionhub/"
          // twitter="https://twitter.com/"
          // linkedin="https://www.linkedin.com/"
          // facebook="https://www.facebook.com/"
        />
      </div>
      <div className="p-5 text-center text-justify">
        <article>
          ミッション サポートと情報提供:
          ミックスの子供たちやその親が、アイデンティティの探求や困難に直面した際に、相互のサポートや情報提供ができる場所です。アイデンティティ形成や認識の違い、カルチャーショック、言語の学習などに関する情報や経験を共有し、支え合うことができます。
          コミュニティの形成:
          ミックスの子供たちが同じような経験や背景を持つ仲間とつながることは重要です。ミックスの子供たちが集まるコミュニティや交流会、サポートグループの設立や支援を行うことで、互いに支え合い、共通の課題や経験を共有できる場を提供します。
          カルチャーブリッジの提供:
          ミックスの子供たちは異なる文化間で育つため、日本の文化と他の文化とのつながりをサポートする必要があります。言語学習プログラムや文化交流イベント、異文化理解教育などを通じて、異なる文化間の橋渡しを支援します。
          アイデンティティの受容と肯定:
          ミックスの子供たちが自身のアイデンティティを受け入れ、肯定するための支援を提供します。自己啓発プログラムやカウンセリング、アイデンティティに関するワークショップなどを通じて、アイデンティティクライシスや自己肯定感の向上を支援します。
          子供と親の交流と情報共有:
          ミックスの子供たちの親同士がつながり、情報や経験を共有する場を提供します。子育ての相談や教育に関する情報交換、地域のイベントや活動の参加などを通じて、親同士のコミュニティを形成します。
          偏見や差別への対応と啓蒙活動:
          ミックスの子供たちが直面する偏見や差別に対して、コミュニティがサポートし、啓蒙活動を行います。差別に対する情報提供や対話の場を提供し、ミックスの存在と多様性の価値を広める活動を行います。
        </article>
      </div>
    </div>
    <br />
  </Layout>
);

export default AboutPage;
