
import { QuestionOption, Attitude, Asker } from './types';

export const QUESTIONS: QuestionOption[] = [
  { id: 'marriage', label: '被催婚', icon: 'favorite' },
  { id: 'salary', label: '问薪水', icon: 'payments' },
  { id: 'kids', label: '生娃计划', icon: 'baby_changing_station' },
  { id: 'grade', label: '问成绩/考编', icon: 'school' },
  { id: 'house', label: '何时买房', icon: 'home' },
  { id: 'compare', label: '比孩子成绩', icon: 'groups_3' },
];

export const ATTITUDES: { id: Attitude; label: string; icon: string }[] = [
  { id: 'HUMOROUS', label: '幽默搞怪', icon: 'sentiment_very_satisfied' },
  { id: 'POLITE', label: '温和礼貌', icon: 'handshake' },
  { id: 'HARDCORE', label: '硬核反击', icon: 'bolt' },
];

export const ASKERS: { id: Asker; label: string; icon: string; color: string }[] = [
  { id: 'RELATIVES', label: '亲戚长辈', icon: 'person', color: 'bg-blue-100 text-blue-600' },
  { id: 'NEIGHBOR', label: '邻居阿姨', icon: 'person_3', color: 'bg-pink-100 text-pink-600' },
  { id: 'PARENTS', label: '自家爹妈', icon: 'person_4', color: 'bg-green-100 text-green-600' },
  { id: 'STRANGER', label: '远房路人', icon: 'diversity_3', color: 'bg-orange-100 text-orange-600' },
];

export const ASSETS = {
  RESULT_IMAGE: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGk80AM57AEgI_BMiyfqSQP655MZC_FcyWkBs4RIubGZzl_jcRPmy1qt-wnsxnlFejf0pm-bczg1dUU5XQIMcbZSBwt4Kus3Sia42n8UAU6Wa2n5Dp7p4fro-Hjik0hCPm6eXxE3XzRbZqa4fQkyN8fwqeL8NcRxefxwcYeoLu3gOx_5aVrpPwLyoqbV0U6PPC-2Y5jtvoZgA9_EQJ2sJQuIm3MUElQepCsTLb4WuLqIvbQRLLwtmYMc-ZpBLJmH-_x9iqYXAJ7o7j",
  AVATAR_EXPLORE: "https://lh3.googleusercontent.com/aida-public/AB6AXuDoAyKJ6A-HM_fme0KT6IoByO5vobDeuwew_liyLQFyqfi7V024TE40uFE7jJ9-bupZntBVw82ZM4P4bXUCkkTbj_9SKvWoXCU0Pdc9nxfIq7MPi2ycfLD-PtmRs89Az1GZARvgGabCRoBscs49AVYfJL26Cgxq5iZyN32B3ptKxpM9ji-NAlB0PIJcLTSGjH5wODU6hQQh9MHRsl5Nb-YT-D7lO-2TpkmzIKwsxt8IOAVxcrdHdl_Ga1IH9mFVvt7cyQUQp1-ZzYN5"
};
