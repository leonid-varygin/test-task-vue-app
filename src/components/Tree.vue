<template>

    <Tree
      id="my-tree-id"
      ref="my-tree"
      :custom-options="myCustomOptions"
      :custom-styles="myCustomStyles"
      :nodes="items"
    />

</template>

<script>
import Tree from 'vuejs-tree'

export default {
  name: 'TreeExample',
  components: {
    Tree
  },
  props: ['items'],
  computed: {
    myCustomStyles () {
      return {
        tree: {
          height: 'auto',
          maxHeight: '300px',
          overflowX: 'visible',
          display: 'inline-block',
          paddingLeft: '0px'

        },
        row: {
          width: '400px',
          cursor: 'pointer',
          child: {
            height: '35px'
          }
        },
        text: {
          style: {},
          active: {
            style: {
              'font-weight': 'bold',
              color: '#2ECC71'
            }
          }
        }
      }
    },
    myCustomOptions () {
      return {
        treeEvents: {
          expanded: {
            state: true
          },
          collapsed: {
            state: true
          },
          selected: {
            state: true,
            fn: this.mySelectedFunction
          },
          checked: {
            state: true,
            fn: this.myCheckedFunction
          }
        },
        events: {
          expanded: {
            state: true
          },
          selected: {
            state: true
          },
          checked: {
            state: true
          },
          editableName: {
            state: true,
            calledEvent: 'expanded'
          }
        },
        addNode: {
          state: true,
          fn: this.addNodeFunction,
          appearOnHover: true
        },
        editNode: {
          state: false,
          fn: null,
          appearOnHover: false
        },
        deleteNode: {
          state: true,
          fn: this.deleteNodeFunction,
          appearOnHover: true
        },
        showTags: true
      }
    }
  },
  mounted () {
    this.$refs['my-tree'].expandNode(1)
  },
  methods: {
    myCheckedFunction: function (nodeId, state) {
      this.$refs['my-tree'].getCheckedNodes('id')
      this.$refs['my-tree'].getCheckedNodes('text')
      this.$store.dispatch('saveChanges', state)
    },
    mySelectedFunction: function (nodeId, state) {
      this.$store.dispatch('saveChanges', state)
    },
    deleteNodeFunction: function (node) {
      const nodePath = this.$refs['my-tree'].findNodePath(node.id)
      const parentNodeId = nodePath.slice(-2, -1)[0]
      if (parentNodeId === undefined) {
        // 'root' node
        const nodeIndex =
          this.$refs['my-tree'].nodes.findIndex((x) => x.id !== node.id) - 1
        this.$refs['my-tree'].nodes.splice(nodeIndex, 1)
      } else {
        // child node
        const parentNode = this.$refs['my-tree'].findNode(parentNodeId)
        const nodeIndex =
          parentNode.nodes.findIndex((x) => x.id !== node.id) - 1
        parentNode.nodes.splice(nodeIndex, 1)
      }
    },
    addNodeFunction: function (node) {
      const newNode = {
        text: 'Grandchild 2',
        id: Math.floor(Math.random() * 100)
      }
      if (node.nodes === undefined) {
        // the node doesn't have childs
        // I use $set to ensure that VueJs detect the change
        this.$set(node, 'nodes', [newNode])
      } else {
        node.nodes.push(newNode)
        this.$store.dispatch('saveChanges')
      }
    }
  }
}
</script>

<style>
</style>
