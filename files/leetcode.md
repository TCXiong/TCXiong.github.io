# 标题信息是：leetcode题号+标题名字





# 1. Two Sum

测试链接：https://leetcode.com/problems/two-sum/

建立一个hashmap，key装数组的值，value装对应的位置。遍历数组，当遍历到一个位置时，检查hashmap中是否存在能和当前值组成target的数，有的话直接将两个index返回，没有的话，把当前值位置装入map中，遍历下一个

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        //key->value in the array.  value->location
        HashMap<Integer, Integer> map = new HashMap<>();
        
        for(int i = 0; i < nums.length; i++){
            if(map.containsKey(target-nums[i])){
                return new int[] {i, map.get(target-nums[i])};
            } 
            map.put(nums[i],i);
        }
        return new int[] {-1,-1};
    }
}
```

备注：注意熟悉一些hashmap的方法，containsKey， get之类的

# 2. Add Two Number

链表

测试链接：https://leetcode.com/problems/add-two-numbers/

注意，不要将这个链表直接转换成数字，然后加。链表可以非常长，会造成越界！

如图

![image-20220728182020526](/Users/tianchengxiong/Library/Application Support/typora-user-images/image-20220728182020526.png)



```java
public static class ListNode {
		public int val;
		public ListNode next;

		public ListNode(int value) {
			this.val = value;
		}
	}

public static ListNode addTwoNumbers(ListNode head1, ListNode head2) {
		int ca = 0;   //进位信息
		int n1 = 0;
		int n2 = 0;
		int n = 0;
		ListNode c1 = head1;
		ListNode c2 = head2;
		ListNode node = null;
		ListNode pre = null;
		while (c1 != null || c2 != null) {  //考虑了两个链表长短不一的情况
			n1 = c1 != null ? c1.val : 0;
			n2 = c2 != null ? c2.val : 0;
			n = n1 + n2 + ca;    //来到下一位时候，要把前一位进位信息相加 ！！
			pre = node;
			node = new ListNode(n % 10); //取个位（当前位的数字）
			node.next = pre;   //反向链接链表了，注意在后面调回
			ca = n / 10;    //（取十位）
			c1 = c1 != null ? c1.next : null;
			c2 = c2 != null ? c2.next : null;
		}
		if (ca == 1) {
			pre = node;
			node = new ListNode(1);
			node.next = pre;
		}
		return reverseList(node);
	}

public static ListNode reverseList(ListNode head) {
		ListNode pre = null;
		ListNode next = null;
		while (head != null) {
			next = head.next;
			head.next = pre;
			pre = head;
			head = next;
		}
		return pre;
	}
}
```

备注：需注意如何取个位，十位数。 进位信息的处理要注意！链表的反转要写熟啊！！！！



# 3. Longest Substring Without Repeating Characters



测试链接：https://leetcode.com/problems/longest-substring-without-repeating-characters/

对于字串（substring）问题，考虑以i结尾的字串，最长无重复是多长。每一个位置求一个答案，最后所有位置中的最大值就是答案。

我们可以用map来存每一个字符对应的位置。注意如果一个字符出现多次，要存它的最新位置，所以需要不断更新map。

对于位置i，影响i这个位置的答案因素有两个。1）不能越过左边第一次出现i这个位置的字符。2）不能越过左边第一次出现i-1这个位置字符 。求这两个数的最小值作为i的答案

我们可以只用一个变量来记录前一个往左推的最远位置。


```java
public static int lengthOfLongestSubstring(String str) {
		if (str == null || str.equals("")) {
			return 0;
		}
		char[] chas = str.toCharArray();
		int[] map = new int[256];   //用ascii
		for (int i = 0; i < 256; i++) {
			map[i] = -1;
		}
		int len = 0;  //答案
		int pre = -1;  //i-1位置往左最远推多远，（不能取该位置！注意边界问题）
		int cur = 0;
		for (int i = 0; i != chas.length; i++) {
			pre = Math.max(pre, map[chas[i]]);  //两个位置，选离当前最近的那个位置
			cur = i - pre;
			len = Math.max(len, cur);
			map[chas[i]] = i;
		}
		return len;
	}

```





# 4. Median of Two Sorted Arrays

测试链接：https://leetcode.com/problems/median-of-two-sorted-arrays/

因为抠边界情况太多，我们用具体例子分析

先把**等长数组**求上中位数这个f函数解决：

![image-20220729145614810](/Users/tianchengxiong/Library/Application Support/typora-user-images/image-20220729145614810.png)

![image-20220729145645245](/Users/tianchengxiong/Library/Application Support/typora-user-images/image-20220729145645245.png)

代码如下：

```java
public static int getUpMedian(int[] a1, int s1, int e1, int[] a2, int s2, int e2) {
        int mid1 = 0;
        int mid2 = 0;
        while(s1 < e1){
            mid1 = (s1 + e1)/2;
            mid2 = (s2 + e2)/2;

            if(a1[mid1] == a2[mid2]){
                return a1[mid1];
            }
            //奇数
            if((e1 - s1 + 1) % 2 != 0){
                if(a1[mid1] > a2[mid2]){
                    if(a2[mid2] > a1[mid1 - 1]){
                        return a2[mid2];
                    }else{
                        e1 = mid1 - 1;
                        s2 = mid2 + 1;
                    }
                }else{
                    if(a1[mid1] > a2[mid2 - 1]){
                        return a1[mid1];
                    }else{
                        s1 = mid1 + 1;
                        e2 = mid2 - 1;
                    }
                }
            }else{
                if(a1[mid1] > a2[mid2]){
                    e1 = mid1;
                    s2 = mid2 + 1;
                }else{
                    s1 = mid1 + 1;
                    e2 = mid2;
                }
            }
        }
        return Math.min(a1[s1], a2[s2]);
    }
```



接下里解决有序不等长数组求第k小的函数：

![image-20220729151801512](/Users/tianchengxiong/Library/Application Support/typora-user-images/image-20220729151801512.png)

![image-20220729151818780](/Users/tianchengxiong/Library/Application Support/typora-user-images/image-20220729151818780.png)





# 5. Longest Palindromic Substring

测试链接：https://leetcode.com/problems/longest-palindromic-substring/



用manacher算法做。

代码实现：

```java
public static String longestPalindrome(String str) {
		if (str == null || str.length() == 0) {
			return "";
		}
		char[] charArr = manacherString(str);
		int[] pArr = new int[charArr.length];
		int index = -1;
		int pR = -1;
		int max = Integer.MIN_VALUE;
		int mid = 0;
		for (int i = 0; i != charArr.length; i++) {
			pArr[i] = pR > i ? Math.min(pArr[2 * index - i], pR - i) : 1;
			while (i + pArr[i] < charArr.length && i - pArr[i] > -1) {
				if (charArr[i + pArr[i]] == charArr[i - pArr[i]])
					pArr[i]++;
				else {
					break;
				}
			}
			if (i + pArr[i] > pR) {
				pR = i + pArr[i];
				index = i;
			}
			if (max < pArr[i]) {
				max = pArr[i];
				mid = i;
			}
		}
		mid = (mid - 1) / 2;
		max = max - 1;
		return str.substring((max & 1) == 0 ? mid - (max / 2) + 1 : mid - (max / 2), mid + (max / 2) + 1);
	}


public static char[] manacherString(String str) {
		char[] charArr = str.toCharArray();
		char[] res = new char[str.length() * 2 + 1];
		int index = 0;
		for (int i = 0; i != res.length; i++) {
			res[i] = (i & 1) == 0 ? '#' : charArr[index++];
		}
		return res;
}
```

备注：manacher要多复习，特别注意边界问题，实在不行，举例子来确定边界



# 7. Reverse Integer

测试链接：https://leetcode.com/problems/reverse-integer/

本题处理时，首先将数字全当作负数进行处理。因为当给出系统最小值时，无法用正数装，所以就无法从正数转负数

boolean neg = ((x >>> 31) & 1) == 1; 可以直接用x < 0



代码如下：

```java
public static int reverse(int x) {
		boolean neg = ((x >>> 31) & 1) == 1;  //无符号右移31位，符号位来到最低位，&1如果等于1，表示原本最高位符号为1，是个负数
		x = neg ? x : -x;  //全当负数处理
		int m = Integer.MIN_VALUE / 10;
		int o = Integer.MIN_VALUE % 10;
		int res = 0;
		while (x != 0) {
      //溢出检查，如果当前结果比系统最小值除10还要小，则当前结果乘10，比系统最小值小。如果当前结果等于系统最小值除10，则判断模。
			if (res < m || (res == m && x % 10 < o)) {
				return 0;
			}
			res = res * 10 + x % 10;
			x /= 10;
		}
		return neg ? res : Math.abs(res);
	}

```





# 8. String to Integer (atoi)

此题纯恶心人

测试链接：https://leetcode.com/problems/string-to-integer-atoi/

先过滤，再用算法进行转换

 

代码实现：

```java
```



补充：系统最小值的负数还是自己





# 10. Regular Expression Matching(hard) 待刷

测试链接：https://leetcode.com/problems/regular-expression-matching/

动态规划

如何把pattern转换成string，然后和目标对比

定义一个函数boolean f(str, si, pattern, pi), 含义为str[si...]能否由pattern[pi...]变出来。

先来用暴力方法尝试：

对于普遍情况，

1. si 没越界 pi 没越界，pi+1的位置不是*，此时要求 si和pi位置字符相等，或者pi位置是"."，然后还得要求后面的字符也得配上（递归）
2. si 没越界 pi 没越界，pi+1的位置是*，但[pi]配不上[si] ，此时的“ *”当作空处理   ，看si和pi+2位置能否配上
3. si 没越界 pi 没越界，pi+1位置是* ， [pi]配上[si]，此时有很多情况，用如下示例图说明。
   ![image-20220802190231034](/Users/tianchengxiong/Library/Application Support/typora-user-images/image-20220802190231034.png)

```java
// str[si.....] 能否被 pattern[pi...] 变出来
// 潜台词：pi位置，pattern[pi] != '*'
public static boolean process1(char[] str, char[] pattern, int si, int pi) {
  //第一个base case是si来到终止位置，为空串，什么情况下，从pi出发的pattern也能组成空串？
		if (si == str.length) { 
			if (pi == pattern.length) { //1.pi也结束了，空串配空串
				return true;
			}
       //2. 例子："a*b*c*d*..."
			if (pi + 1 < pattern.length && pattern[pi + 1] == '*') {
				return process1(str, pattern, si, pi + 2); //从pi+2开始的后面也能变成空串
			}
			return false;
		}
  
	//第二个base case是pi来到终止位置，pattern为空串
		if (pi == pattern.length) {
			return si == str.length;
		}
  //普遍情况
		// si 没越界 pi 没越界 pi+1位置不是*
		if (pi + 1 >= pattern.length || pattern[pi + 1] != '*') {//如果pi+1越界 也表示下一个字符不是*
			return ((str[si] == pattern[pi]) || (pattern[pi] == '.')) && process1(str, pattern, si + 1, pi + 1);
		}
		// si 没越界 pi 没越界 pi+1位置是*
		if (pattern[pi] != '.' && str[si] != pattern[pi]) {
			return process1(str, pattern, si, pi + 2);
		}
		// si 没越界 pi 没越界 pi+1位置是* 且 [pi]可配[si]
		if (process1(str, pattern, si, pi + 2)) {  //“*”把前一个字符变成空来使用
			return true;
		}
		while (si < str.length && (str[si] == pattern[pi] || pattern[pi] == '.')) { 
			if (process1(str, pattern, si + 1, pi + 2)) {
				return true;
			}
			si++;
		}
		return false;
}


//对两个数组进行有效性检查
public static boolean isValid(char[] str, char[] pattern) {
		for (char cha : str) {  //str中不能包含.和*
			if (cha == '.' || cha == '*') {
				return false;
			}
		}
		for (int i = 0; i < pattern.length; i++) { //*不能在开头位置，**不能出现
			if (pattern[i] == '*' && (i == 0 || pattern[i - 1] == '*')) {
        //注意此时i-1是不会越界的，因为当来到i-1时，就一定不是0位置！
				return false;
			}
		}
		return true;
}


public static boolean isMatch1(String s, String p) {
		if (s == null || p == null) {   //因为下面的转换数组，所以不能允许空字符串的出现
			return false;
		}
		char[] str = s.toCharArray();
		char[] pattern = p.toCharArray();
		return isValid(str, pattern) && process1(str, pattern, 0, 0);
	}
```



优化成动态规划（记忆化搜索，没有整理依赖过程）：   

```java
 public static boolean isMatch2(String s, String p) {
		if (s == null || p == null) {
			return false;
		}
		char[] str = s.toCharArray();
		char[] pattern = p.toCharArray();
		int[][] dp = new int[str.length + 1][pattern.length + 1];
		for (int si = 0; si <= str.length; si++) {
			for (int pi = 0; pi <= pattern.length; pi++) {
				dp[si][pi] = -1;  //dp数组的初始化
			}
		}
		// dp[si][pi] == -1   //表示当前的这个si和pi组合没有算过
		// dp[si][pi] == 0 si pi算的结果是false
		// dp[si][pi] == 1 si pi算的结果是true
		return isValid(str, pattern) && process2(str, pattern, 0, 0, dp);
}

public static boolean process2(char[] str, char[] pattern, int si, int pi, int[][] dp) {
  //观察这个答案之前算过没有，如果算过，直接返回
		if (dp[si][pi] != -1) {
			return dp[si][pi] == 1; //如果是1就返回true，否则false
		}
		// si pi 这个参数组合第一次算

		if (si == str.length) { // si越界了
			if (pi == pattern.length) {
				dp[si][pi] = 1;
				return true;
			}
			// (pi pi+1) pi+2 ....
			if (pi + 1 < pattern.length && pattern[pi + 1] == '*') {
				boolean ans = process2(str, pattern, si, pi + 2, dp);
				dp[si][pi] = ans ? 1 : 0;
				return ans;
			}
			dp[si][pi] = 0;
			return false;
		}
		// si 没越界
		if (pi == pattern.length) {
			boolean ans = si == str.length;
			dp[si][pi] = ans ? 1 : 0;
			return ans;
		}
		// si 没越界 pi 没越界
		if (pi + 1 >= pattern.length || pattern[pi + 1] != '*') {
			boolean ans = ((str[si] == pattern[pi]) || (pattern[pi] == '.'))
					&& process2(str, pattern, si + 1, pi + 1, dp);
			dp[si][pi] = ans ? 1 : 0;
			return ans;
		}
		// si 没越界 pi 没越界 pi+1 *
		if (pattern[pi] != '.' && str[si] != pattern[pi]) {
			boolean ans = process2(str, pattern, si, pi + 2, dp);
			dp[si][pi] = ans ? 1 : 0;
			return ans;
		}
		if (process2(str, pattern, si, pi + 2, dp)) {
			dp[si][pi] = 1;
			return true;
		}
		while (si < str.length && (str[si] == pattern[pi] || pattern[pi] == '.')) {
			if (process2(str, pattern, si + 1, pi + 2, dp)) {
				dp[si][pi] = 1;
				return true;
			}
			si++;
		}
		dp[si][pi] = 0;
		return false;
}
```



进一步优化（枚举行为优化）

```java
public static boolean isMatch3(String s, String p) {
		if (s == null || p == null) {
			return false;
		}
		char[] str = s.toCharArray();
		char[] pattern = p.toCharArray();
		return isValid(str, pattern) && process3(str, pattern, 0, 0);
	}

	// 举例说明枚举行为优化
	// 求状态(si = 3, pi = 7)时，假设状况如下
	// str : a a a b ...
	// si  : 3 4 5 6 ...
	// pat : a * ? ...
	// pi  : 7 8 9 ...
	// 状态(si = 3, pi = 7)会依赖：
	//   状态(si = 3, pi = 9)
	//   状态(si = 4, pi = 9)
	//   状态(si = 5, pi = 9)
	//   状态(si = 6, pi = 9)
	//
	// 求状态(si = 2, pi = 7)时，假设状况如下
	// str : a a a a b ...
	// si  : 2 3 4 5 6 ...
	// pat : a * ? ...
	// pi  : 7 8 9 ...
	// 状态(si = 2, pi = 7)会依赖：
	//   状态(si = 2, pi = 9)
	//   状态(si = 3, pi = 9)
	//   状态(si = 4, pi = 9)
	//   状态(si = 5, pi = 9)
	//   状态(si = 6, pi = 9)
	//
	// 注意看状态(si = 2, pi = 7)依赖的后4个，其实就是状态(si = 3, pi = 7)
	// 所以状态(si = 2, pi = 7)的依赖可以化简为：
	//   状态(si = 2, pi = 9)
	//   状态(si = 3, pi = 7)
	// 这样枚举行为就被化简成了有限两个状态，详细情况看代码
	public static boolean process3(char[] str, char[] pattern, int si, int pi) {
		if (si == str.length && pi == pattern.length) {
			return true;
		}
		if (si == str.length) {
			return (pi + 1 < pattern.length && pattern[pi + 1] == '*') && process3(str, pattern, si, pi + 2);
		}
		if (pi == pattern.length) {
			return false;
		}
		if (pi + 1 >= pattern.length || pattern[pi + 1] != '*') {
			return ((str[si] == pattern[pi]) || (pattern[pi] == '.')) && process3(str, pattern, si + 1, pi + 1);
		}
		// 此处为枚举行为优化，含义看函数注释
		if ((str[si] == pattern[pi] || pattern[pi] == '.') && process3(str, pattern, si + 1, pi)) {
			return true;
		}
		return process3(str, pattern, si, pi + 2);
	}
```



最终版动态规划：

```java
public static boolean isMatch4(String str, String pattern) {
		if (str == null || pattern == null) {
			return false;
		}
		char[] s = str.toCharArray();
		char[] p = pattern.toCharArray();
		if (!isValid(s, p)) {
			return false;
		}
		int N = s.length;
		int M = p.length;
		boolean[][] dp = new boolean[N + 1][M + 1];
		dp[N][M] = true;
		for (int j = M - 1; j >= 0; j--) {
			dp[N][j] = (j + 1 < M && p[j + 1] == '*') && dp[N][j + 2];
		}
		// dp[0..N-2][M-1]都等于false，只有dp[N-1][M-1]需要讨论
		if (N > 0 && M > 0) {
			dp[N - 1][M - 1] = (s[N - 1] == p[M - 1] || p[M - 1] == '.');
		}
		for (int i = N - 1; i >= 0; i--) {
			for (int j = M - 2; j >= 0; j--) {
				if (p[j + 1] != '*') {
					dp[i][j] = ((s[i] == p[j]) || (p[j] == '.')) && dp[i + 1][j + 1];
				} else {
					if ((s[i] == p[j] || p[j] == '.') && dp[i + 1][j]) {
						dp[i][j] = true;
					} else {
						dp[i][j] = dp[i][j + 2];
					}
				}
			}
		}
		return dp[0][0];
}
```





# 11. Container With Most Water

测试链接：https://leetcode.com/problems/container-with-most-water/

从两头开始看，哪一侧高度小，结算哪侧。注意！！1结算时，不是在求每个杆的最优解，而是看是否能发现更好的解。某个杆算出来的答案可能不是最优解，但是它的最优解一定在前面记录过了。

例如一共有十条杆，0号位置的高度为8，9号位置的高度为6，此时以9号位置为右边界，装最多水情况是0号位置作为左边界。

代码如下：
```java
public static int maxArea(int[] h) {
		int max = 0;
		int l = 0;
		int r = h.length - 1;
		while (l < r) {//当l==r时，组不成矩形，装不了水。
			max = Math.max(max, Math.min(h[l], h[r]) * (r - l));
			if (h[l] > h[r]) {
				r--;
			} else {
				l++;
			}
		}
		return max;
}
```

有点贪心的味道，舍弃可能值的思想



# 12. Integer to Roman

测试链接：https://leetcode.com/problems/integer-to-roman/

解决如何取各个位的数字

本题主要是搞清楚罗马数字原理。建立一张映射表，根据阿拉伯数字在表中找对应的罗马字符即可

代码实现：

```java
public static String intToRoman(int num) {
		String[][] c = { 
				{ "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX" },
				{ "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC" },
				{ "", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM" },
				{ "", "M", "MM", "MMM" } };
		StringBuilder roman = new StringBuilder();
		roman
		.append(c[3][num / 1000 % 10])
		.append(c[2][num / 100 % 10])
		.append(c[1][num / 10 % 10])
		.append(c[0][num % 10]);
		return roman.toString();
	}
```



# 13. Roman to Integer

测试链接：https://leetcode.com/problems/roman-to-integer/

大体思想和12差不多

在罗马字符转阿拉伯数字时需要注意的一点是罗马数字中前一个数小于当前数是作减法。我们可以做如下处理，对于罗马字符，abcdefg，如果a小于b，把a标注-a，对于b，如果b小于c，则把b标注为-b，否则维持原样。

代码实现：

```java
public static int romanToInt(String s) {
		int nums[] = new int[s.length()];
		for (int i = 0; i < s.length(); i++) {
			switch (s.charAt(i)) {
			case 'M':
				nums[i] = 1000;
				break;
			case 'D':
				nums[i] = 500;
				break;
			case 'C':
				nums[i] = 100;
				break;
			case 'L':
				nums[i] = 50;
				break;
			case 'X':
				nums[i] = 10;
				break;
			case 'V':
				nums[i] = 5;
				break;
			case 'I':
				nums[i] = 1;
				break;
			}
		}
		int sum = 0;
  //注意数组越界的情况，最后一个数，单独拧出来算
		for (int i = 0; i < nums.length - 1; i++) {
			if (nums[i] < nums[i + 1]) {
				sum -= nums[i];
			} else {
				sum += nums[i];
			}
		}
		return sum + nums[nums.length - 1];
}
```





# 14. Longest Common Prefix

测试链接：https://leetcode.com/problems/longest-common-prefix/

把第一个字符串当作标准，遍历后面的字符串，看能和第一个匹配多少，遍历一遍取最小值。

代码实现：

```java
public static String longestCommonPrefix(String[] strs) {
		if (strs == null || strs.length == 0) {
			return "";
		}
		char[] chs = strs[0].toCharArray();
		int min = Integer.MAX_VALUE;
		for (String str : strs) {
			char[] tmp = str.toCharArray();
			int index = 0;
			while (index < tmp.length && index < chs.length) {
				if (chs[index] != tmp[index]) {
					break;
				}
				index++;
			}
			min = Math.min(index, min);
			if (min == 0) {   //没有匹配上的，提前结束，提高运行效率
				return "";  
			}
		}
		return strs[0].substring(0, min);
	}

```





# 15. 3Sum

测试链接：https://leetcode.com/problems/3sum/

（此方法适合有序数组）我们可以首先回顾一下2sum的双指针做法，给定一个数组和一个sum，返回一个集合，集合里存所有满足两个数加起来等于sum的对。定义两个两个变量L和R，分别初始化在最左和最右。如果[L]+[R]<sum,则L++，[L]+[R]>sum,则R--,如果相等，则收集答案，收集的时候，要观察L的前一个字符是否和L相等，相等的话就不用收集（因为前面已经收集过了）

对于3sum问题，我们可以将其当作2sum的变种。定义一个变量p，初始化到最左边。从左往右遍历，每到一个位置，我们将这个位置的数先当作三元组的第一个数，然后在以这个数字为头，在剩下的数字中作2sum问题即可，当更新p的时候，同样要注意，如果当前数字和p前一个数字相同时，要跳过。



代码实现：
```java
public static List<List<Integer>> threeSum1(int[] nums) {
		Arrays.sort(nums);
		List<List<Integer>> ans = new ArrayList<>();
		// 第一个数选了i位置的数
		for (int i = 0; i < nums.length - 2; i++) {
			if (i == 0 || nums[i - 1] != nums[i]) {
				List<List<Integer>> nexts = twoSum1(nums, i + 1, -nums[i]);
				for (List<Integer> cur : nexts) {
					cur.add(0, nums[i]);
					ans.add(cur);
				}
			}
		}
		return ans;
	}

	// nums已经有序了
	// nums[begin......]范围上，找到累加和为target的所有二元组
	public static List<List<Integer>> twoSum1(int[] nums, int begin, int target) {
		int L = begin;
		int R = nums.length - 1;
		List<List<Integer>> ans = new ArrayList<>();
		while (L < R) {
			if (nums[L] + nums[R] > target) {
				R--;
			} else if (nums[L] + nums[R] < target) {
				L++;
			} else {
				if (L == begin || nums[L - 1] != nums[L]) {
					List<Integer> cur = new ArrayList<>();
					cur.add(nums[L]);
					cur.add(nums[R]);
					ans.add(cur);
				}
				L++;
			}
		}
		return ans;
	}
```



注意：正常操作过程中，需要将数字插入到数组的第一个位置中，代价有点大，我们可以倒着来，比如来到一个数是5，我们找它右边哪两个二元组的和是-5，添加到三元组中，最后将5加到数组后面。

代码实现：

```java
public static List<List<Integer>> threeSum2(int[] nums) {
		Arrays.sort(nums);
		int N = nums.length;
		List<List<Integer>> ans = new ArrayList<>();
		for (int i = N - 1; i > 1; i--) {
			if (i == N - 1 || nums[i] != nums[i + 1]) {
				List<List<Integer>> nexts = twoSum2(nums, i - 1, -nums[i]);
				for (List<Integer> cur : nexts) {
					cur.add(nums[i]);
					ans.add(cur);
				}
			}
		}
		return ans;
	}

	public static List<List<Integer>> twoSum2(int[] nums, int end, int target) {
		int L = 0;
		int R = end;
		List<List<Integer>> ans = new ArrayList<>();
		while (L < R) {
			if (nums[L] + nums[R] > target) {
				R--;
			} else if (nums[L] + nums[R] < target) {
				L++;
			} else {
				if (L == 0 || nums[L - 1] != nums[L]) {
					List<Integer> cur = new ArrayList<>();
					cur.add(nums[L]);
					cur.add(nums[R]);
					ans.add(cur);
				}
				L++;
			}
		}
		return ans;
	}
```



# 17. Letter Combinations of a Phone Number *dfs

测试链接：https://leetcode.com/problems/letter-combinations-of-a-phone-number/

深度优先遍历

定义一个数组str储存按键数字，str['2', '3']。定义一个变量index来记录当前按键位置，比如str[0]，表示当前按数字2这个键，当index等于str的长度时，说明一个分支已经遍历完成，可以收集答案。当index没有到达str长度时，取2数字对应的字母数组，对于每个字母来做深度优先遍历。

代码实现：

```java
public static char[][] phone = { 
			{ 'a', 'b', 'c' }, // 2    0
			{ 'd', 'e', 'f' }, // 3    1
			{ 'g', 'h', 'i' }, // 4    2
			{ 'j', 'k', 'l' }, // 5    3
			{ 'm', 'n', 'o' }, // 6    
			{ 'p', 'q', 'r', 's' }, // 7 
			{ 't', 'u', 'v' },   // 8
			{ 'w', 'x', 'y', 'z' }, // 9
	};

	// "23"
public static List<String> letterCombinations(String digits) {
		List<String> ans = new ArrayList<>();
		if (digits == null || digits.length() == 0) {
			return ans;
		}
		char[] str = digits.toCharArray();
		char[] path = new char[str.length];
		process(str, 0, path, ans);
		return ans;
}

	// str = ['2','3']  
	// str[....index-1]，按出的结果是什么都在path里 （path就是之前算过的答案）
	// str[index...]  按完之后，有哪些组合，放入到ans里
public static void process(char[] str, int index, char[] path, List<String> ans) {
		if (index == str.length) {
			ans.add(String.valueOf(path));
		} else {
			char[] cands = phone[str[index] - '2'];
			for (char cur : cands) {
				path[index] = cur;
				process(str, index + 1, path, ans);
			}
		}
}
```





# 19. Remove Nth Node From End of List

测试链接：https://leetcode.com/problems/remove-nth-node-from-end-of-list/

链表的调整

首先思考如何找到要删除的节点，我们可以定义两个变量L和R，都初始化在最左边，假设删除倒数第k个，我们就先让R移动k个，然后这两个变量同时向右边移动，直到R指向最后一个变量，此时L指向都就是要删除的元素。但是如果要删除这个元素，我们应该要找它的前一个元素，将其指针指向下一个元素。所以如果要删除倒数第k个，我们将R先向右移动k+1个。